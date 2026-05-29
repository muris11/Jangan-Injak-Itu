import Phaser from "phaser";
import { endlessDefinition, storyLevels, totalStoryLevels } from "@/game/data/levels";
import type { Character, GameHud, GameMode, GameResult, GameSettings, LevelDefinition } from "@/types/game";
import { createId } from "@/lib/storage";
import { playTone } from "@/game/audio";
import { CONTROL_EVENT, type MobileControlDetail } from "@/game/controls";

type GameCallbacks = {
  onHud: (hud: GameHud) => void;
  onFinish: (result: GameResult) => void;
  onMessage: (message: string) => void;
};

export type ArcadeGameOptions = {
  parent: HTMLElement;
  playerName: string;
  character: Character;
  mode: GameMode;
  settings: GameSettings;
  callbacks: GameCallbacks;
};

type Runtime = {
  currentLevel: number;
  completedLevels: number;
  score: number;
  totalCoins: number;
  deaths: number;
  startedAt: number;
  pausedTotal: number;
  levelStartedAt: number;
  levelDeaths: number;
  finished: boolean;
};


const BASE_HEIGHT = 720;
const FLOOR_Y = 650;


export class TrapGameScene extends Phaser.Scene {
  protected options: ArcadeGameOptions;
  protected runtime!: Runtime;
  protected definition!: LevelDefinition;
  protected player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private movingPlatforms!: Phaser.Physics.Arcade.Group;
  private hazards!: Phaser.Physics.Arcade.Group;
  private coins!: Phaser.Physics.Arcade.StaticGroup;
  private doors!: Phaser.Physics.Arcade.StaticGroup;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys?: {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    jump: Phaser.Input.Keyboard.Key;
    altJump: Phaser.Input.Keyboard.Key;
    pause: Phaser.Input.Keyboard.Key;
    restart: Phaser.Input.Keyboard.Key;
    mute: Phaser.Input.Keyboard.Key;
  };
  private mobile = { left: false, right: false, jump: false };
  private levelCoins = 0;
  private lastHudPush = 0;
  private lastGrounded = false;
  private gravityTriggered = false;
  private pausedAt: number | null = null;
  private darkness?: Phaser.GameObjects.Rectangle;
  private messageText?: Phaser.GameObjects.Text;
  private mobileListener = (event: Event) => {
    const detail = (event as CustomEvent<MobileControlDetail>).detail;
    if (detail.action === "pause") return this.togglePause();
    if (detail.action === "restart") return this.restartLevel();
    this.mobile[detail.action] = Boolean(detail.pressed);
  };

  constructor(options: ArcadeGameOptions) {
    super({ key: "TrapGameScene" });
    this.options = options;
  }

  init(data?: Partial<Runtime>): void {
    const initial: Runtime = {
      currentLevel: 0,
      completedLevels: 0,
      score: 0,
      totalCoins: 0,
      deaths: 0,
      startedAt: Date.now(),
      pausedTotal: 0,
      levelStartedAt: Date.now(),
      levelDeaths: 0,
      finished: false,
    };
    this.runtime = { ...initial, ...data, levelStartedAt: Date.now(), levelDeaths: data?.levelDeaths ?? 0 };
    this.definition = this.options.mode === "endless" ? endlessDefinition : storyLevels[this.runtime.currentLevel];
    this.levelCoins = 0;
    this.gravityTriggered = false;
    this.pausedAt = null;
  }

  create(): void {
    this.createTextures();
    this.physics.world.gravity.y = 1100;
    this.physics.world.setBounds(0, 0, this.definition.worldWidth, BASE_HEIGHT + 180);
    this.cameras.main.setBackgroundColor("#090A1A");
    this.cameras.main.setBounds(0, 0, this.definition.worldWidth, BASE_HEIGHT);
    this.renderBackdrop();
    this.buildWorld();
    this.buildPlayer();
    this.bindInput();
    this.renderLevelLabels();
    if (this.definition.dark) {
      this.darkness = this.add.rectangle(640, 360, 1280, 720, 0x050511, 0.62).setScrollFactor(0).setDepth(35);
    }
    this.pushHud(this.definition.prankMessage);
    this.options.callbacks.onMessage(this.definition.prankMessage);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener(CONTROL_EVENT, this.mobileListener);
    });
  }

  private createTextures(): void {
    if (this.textures.exists("floor")) return;
    const graphics = this.add.graphics();

    graphics.fillStyle(0x202850, 1).fillRect(0, 0, 64, 42);
    graphics.fillStyle(0x00e5ff, 1).fillRect(0, 0, 64, 5);
    graphics.fillStyle(0x32365f, 1).fillRect(8, 14, 20, 4).fillRect(38, 27, 18, 4);
    graphics.generateTexture("floor", 64, 42).clear();

    graphics.fillStyle(this.options.character.bodyColor, 1).fillRoundedRect(2, 2, 42, 54, 9);
    graphics.fillStyle(this.options.character.accentColor, 1).fillRect(8, 36, 30, 12);
    graphics.fillStyle(0x090a1a, 1).fillRect(11, 15, 6, 7).fillRect(28, 15, 6, 7).fillRect(16, 27, 13, 4);
    graphics.generateTexture("player", 46, 57).clear();

    graphics.fillStyle(0xff3b5c, 1);
    graphics.fillTriangle(0, 30, 18, 0, 36, 30).fillTriangle(28, 30, 46, 0, 64, 30);
    graphics.generateTexture("spike", 64, 30).clear();

    graphics.fillStyle(0xff9f1c, 1).fillCircle(21, 21, 19);
    graphics.lineStyle(3, 0x39ff88, 1).strokeCircle(21, 21, 19);
    graphics.fillStyle(0x39ff88, 1).fillTriangle(18, 4, 26, 0, 28, 9);
    graphics.generateTexture("durian", 44, 44).clear();

    graphics.fillStyle(0xffe44d, 1).fillCircle(13, 13, 12);
    graphics.fillStyle(0xe7b900, 1).fillCircle(13, 13, 7);
    graphics.generateTexture("coin", 26, 26).clear();

    graphics.fillStyle(0x39ff88, 1).fillRoundedRect(0, 0, 54, 78, 6);
    graphics.fillStyle(0x090a1a, 1).fillRect(10, 13, 34, 55);
    graphics.fillStyle(0xffe44d, 1).fillCircle(34, 41, 4);
    graphics.generateTexture("door", 54, 78).clear();

    graphics.fillStyle(0xff3b5c, 1).fillRoundedRect(0, 0, 54, 78, 6);
    graphics.fillStyle(0x090a1a, 1).fillRect(10, 13, 34, 55);
    graphics.fillStyle(0xffffff, 1).fillRect(16, 33, 22, 6);
    graphics.generateTexture("fake-door", 54, 78).clear();

    graphics.fillStyle(0xf4ead7, 1).fillRoundedRect(0, 12, 67, 34, 13);
    graphics.fillStyle(0x090a1a, 1).fillRect(49, 21, 5, 5);
    graphics.fillStyle(0xff3b5c, 1).fillRect(57, 28, 9, 4);
    graphics.fillStyle(0xf4ead7, 1).fillTriangle(8, 13, 14, 0, 19, 14).fillTriangle(43, 14, 50, 0, 54, 15);
    graphics.fillStyle(0xffe44d, 1).fillRect(11, 44, 9, 8).fillRect(47, 44, 9, 8);
    graphics.generateTexture("goat", 68, 52).clear();

    graphics.destroy();
  }

  private renderBackdrop(): void {
    const sky = this.add.graphics().setDepth(-10);
    sky.fillGradientStyle(0x090a1a, 0x090a1a, 0x161333, 0x161333, 1);
    sky.fillRect(0, 0, this.definition.worldWidth, BASE_HEIGHT);
    for (let x = 90; x < this.definition.worldWidth; x += 260) {
      sky.fillStyle(x % 520 === 0 ? 0x9b5cff : 0x00e5ff, 0.16);
      sky.fillCircle(x, 110 + (x % 190), 50);
      sky.fillStyle(0xffffff, 0.3);
      sky.fillRect(x + 48, 74 + (x % 210), 3, 3);
    }
    const skyline = this.add.graphics().setDepth(-5);
    for (let x = 0; x < this.definition.worldWidth; x += 120) {
      const height = 70 + ((x * 7) % 160);
      skyline.fillStyle(0x11142b, 1).fillRect(x, FLOOR_Y - height, 116, height);
      skyline.fillStyle(0xffe44d, 0.22).fillRect(x + 18, FLOOR_Y - height + 28, 8, 12);
    }
  }

  protected buildWorld(): void {
    this.platforms = this.physics.add.staticGroup();
    this.movingPlatforms = this.physics.add.group({ allowGravity: false, immovable: true });
    this.hazards = this.physics.add.group({ allowGravity: false, immovable: true });
    this.coins = this.physics.add.staticGroup();
    this.doors = this.physics.add.staticGroup();

    this.definition.floorSegments.forEach((segment) => {
      const platform = this.platforms.create(segment.x + segment.width / 2, segment.y ?? FLOOR_Y, "floor") as Phaser.Physics.Arcade.Image;
      platform.setDisplaySize(segment.width, 52).refreshBody().setData("falling", Boolean(segment.falling));
    });

    this.definition.platforms?.forEach((definition) => {
      if (definition.moving) {
        const platform = this.movingPlatforms.create(definition.x + definition.width / 2, definition.y, "floor") as Phaser.Physics.Arcade.Image;
        platform.setDisplaySize(definition.width, 38);
        platform.body?.setSize(definition.width, 38);
        this.tweens.add({
          targets: platform,
          y: definition.y - 76,
          yoyo: true,
          repeat: -1,
          duration: 1350,
          ease: "Sine.inOut",
          onUpdate: () => (platform.body as Phaser.Physics.Arcade.Body | undefined)?.updateFromGameObject(),
        });
      } else {
        const platform = this.platforms.create(definition.x + definition.width / 2, definition.y, "floor") as Phaser.Physics.Arcade.Image;
        platform.setDisplaySize(definition.width, 38).refreshBody();
      }
    });

    this.definition.spikes.forEach(({ x, y = FLOOR_Y - 41 }) => {
      const hazard = this.hazards.create(x, y, "spike") as Phaser.Physics.Arcade.Image;
      hazard.setData("type", "spike").body?.setSize(60, 26);
    });

    this.definition.coins.forEach(({ x, y }) => {
      this.coins.create(x, y, "coin");
    });

    this.definition.durians?.forEach(({ x, triggerX }) => {
      const durian = this.hazards.create(x, 50, "durian") as Phaser.Physics.Arcade.Image;
      durian.setData({ type: "durian", triggerX, dropped: false });
      (durian.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    });

    this.definition.goats?.forEach(({ x, y = FLOOR_Y - 55, minX, maxX }) => {
      const goat = this.hazards.create(x, y, "goat") as Phaser.Physics.Arcade.Image;
      goat.setData("type", "goat");
      this.tweens.add({
        targets: goat,
        x: maxX,
        duration: 1200,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
        onUpdate: () => (goat.body as Phaser.Physics.Arcade.Body | undefined)?.updateFromGameObject(),
      });
      goat.x = minX;
    });

    this.definition.fakeDoors?.forEach(({ x, y = FLOOR_Y - 66 }) => {
      const fakeDoor = this.doors.create(x, y, "fake-door") as Phaser.Physics.Arcade.Image;
      fakeDoor.setData("fake", true);
    });

    const finish = this.doors.create(this.definition.worldWidth - 135, FLOOR_Y - 66, "door") as Phaser.Physics.Arcade.Image;
    finish.setData("fake", false);

    if (this.definition.gravityZone) {
      const { startX, endX } = this.definition.gravityZone;
      const ceiling = this.platforms.create((startX + endX) / 2, 72, "floor") as Phaser.Physics.Arcade.Image;
      ceiling.setDisplaySize(endX - startX + 160, 42).refreshBody();
      const zone = this.add.rectangle((startX + endX) / 2, 360, endX - startX, 560, 0x9b5cff, 0.09);
      zone.setStrokeStyle(2, 0x9b5cff, 0.32);
    }
  }

  protected buildPlayer(): void {
    this.player = this.physics.add.sprite(130, FLOOR_Y - 78, "player").setDepth(12);
    this.player.setCollideWorldBounds(false).setBounce(0);
    this.player.body?.setSize(38, 53);
    this.physics.add.collider(this.player, this.platforms, (_player, platform) => {
      this.triggerFallingFloor(platform as Phaser.Physics.Arcade.Image);
    });
    this.physics.add.collider(this.player, this.movingPlatforms);
    this.physics.add.overlap(this.player, this.hazards, (_player, hazard) => {
      this.die((hazard as Phaser.Physics.Arcade.Image).getData("type") === "goat" ? "Kambingnya personal banget." : "Kena jebakan lagi, bro.");
    });
    this.physics.add.overlap(this.player, this.coins, (_player, coin) => {
      const object = coin as Phaser.Physics.Arcade.Image;
      object.disableBody(true, true);
      this.levelCoins += 1;
      playTone("coin", this.options.settings);
      this.pushHud("Koin aman... sejauh ini.");
    });
    this.physics.add.overlap(this.player, this.doors, (_player, door) => {
      const object = door as Phaser.Physics.Arcade.Image;
      if (object.getData("fake")) {
        object.disableBody(true, true);
        this.flashMessage("PINTU PALSU!");
        this.time.delayedCall(300, () => this.die("Pintunya kabur dan harga dirimu ikut jatuh."));
        return;
      }
      this.completeLevel();
    });
    this.cameras.main.startFollow(this.player, true, 0.11, 0.11);
    this.cameras.main.setDeadzone(300, 120);
  }

  protected bindInput(): void {
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.keys = {
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        altJump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
        pause: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P),
        restart: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
        mute: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
      };
    }
    window.addEventListener(CONTROL_EVENT, this.mobileListener);
  }

  protected renderLevelLabels(): void {
    this.add.text(64, 86, this.definition.name.toUpperCase(), {
      fontFamily: "Arial Black, Arial, sans-serif",
      fontSize: "27px",
      color: "#FFE44D",
      stroke: "#090A1A",
      strokeThickness: 5,
    });
    this.add.text(64, 122, this.definition.prankMessage, {
      fontFamily: "Arial, sans-serif",
      fontSize: "18px",
      color: "#FFFFFF",
      backgroundColor: "#12142B",
      padding: { x: 12, y: 8 },
    });
    this.messageText = this.add.text(640, 160, "", {
      fontFamily: "Arial Black, Arial, sans-serif",
      fontSize: "30px",
      color: "#FF3B5C",
      stroke: "#090A1A",
      strokeThickness: 5,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(50).setAlpha(0);
  }

  update(): void {
    if (this.runtime.finished) return;
    if (this.keys && Phaser.Input.Keyboard.JustDown(this.keys.pause)) this.togglePause();
    if (this.keys && Phaser.Input.Keyboard.JustDown(this.keys.restart)) this.restartLevel();
    if (this.keys && Phaser.Input.Keyboard.JustDown(this.keys.mute)) {
      this.options.settings.muted = !this.options.settings.muted;
      this.options.callbacks.onMessage(this.options.settings.muted ? "Audio dimatikan." : "Audio dinyalakan.");
    }
    if (this.physics.world.isPaused) return;

    const left = this.cursors?.left.isDown || this.keys?.left.isDown || this.mobile.left;
    const right = this.cursors?.right.isDown || this.keys?.right.isDown || this.mobile.right;
    const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors?.up as Phaser.Input.Keyboard.Key) ||
      Phaser.Input.Keyboard.JustDown(this.keys?.jump as Phaser.Input.Keyboard.Key) ||
      Phaser.Input.Keyboard.JustDown(this.keys?.altJump as Phaser.Input.Keyboard.Key) ||
      this.mobile.jump;

    if (left) this.player.setVelocityX(-285);
    else if (right) this.player.setVelocityX(285);
    else this.player.setVelocityX(0);

    const grounded = Boolean((this.player.body as Phaser.Physics.Arcade.Body).blocked.down || (this.player.body as Phaser.Physics.Arcade.Body).touching.down);
    if (jumpPressed && grounded) {
      this.player.setVelocityY(-555);
      this.mobile.jump = false;
      playTone("jump", this.options.settings);
    }
    this.lastGrounded = grounded;

    this.definition.durians?.forEach((_entry, index) => {
      const durian = this.hazards.getChildren().filter((child) => (child as Phaser.Physics.Arcade.Image).getData("type") === "durian")[index] as Phaser.Physics.Arcade.Image | undefined;
      if (durian && !durian.getData("dropped") && this.player.x >= Number(durian.getData("triggerX"))) {
        durian.setData("dropped", true);
        (durian.body as Phaser.Physics.Arcade.Body).setAllowGravity(true);
        durian.setVelocityY(40);
      }
    });

    if (this.definition.gravityZone && !this.gravityTriggered &&
        this.player.x > this.definition.gravityZone.startX && this.player.x < this.definition.gravityZone.endX) {
      this.gravityTriggered = true;
      this.physics.world.gravity.y = -950;
      this.player.setVelocityY(-420);
      this.flashMessage("GRAVITASI NGACO!");
      this.time.delayedCall(1250, () => {
        if (!this.runtime.finished) {
          this.physics.world.gravity.y = 1100;
          this.player.setVelocityY(200);
        }
      });
    }

    if (this.player.y > BASE_HEIGHT + 90 || this.player.y < -120) {
      this.die("Lantainya tidak setia.");
    }

    if (this.options.mode === "endless") {
      const survivalScore = Math.floor(this.player.x / 4) + Math.floor(this.elapsedMs() / 110);
      this.runtime.score = Math.max(this.runtime.score, survivalScore);
    }
    if (Date.now() - this.lastHudPush > 160) this.pushHud();
  }

  private triggerFallingFloor(platform: Phaser.Physics.Arcade.Image): void {
    if (!platform.getData("falling") || platform.getData("triggered")) return;
    platform.setData("triggered", true);
    this.flashMessage("LANTAINYA BOHONG!");
    this.time.delayedCall(250, () => {
      platform.disableBody(true, true);
    });
  }

  private die(text: string): void {
    if (this.runtime.finished || this.player.getData("dying")) return;
    this.player.setData("dying", true);
    playTone("hit", this.options.settings);
    if (!this.options.settings.reducedMotion) this.cameras.main.shake(130, 0.008);
    this.flashMessage(text);
    const deaths = this.runtime.deaths + 1;
    const score = Math.max(0, this.runtime.score - 150);

    if (this.options.mode === "endless" || this.options.mode === "one-life") {
      this.runtime = { ...this.runtime, deaths, score };
      this.time.delayedCall(390, () => this.finishGame(false, "Kena lagi, bro.", text));
      return;
    }
    this.time.delayedCall(430, () => {
      this.scene.restart({
        ...this.runtime,
        deaths,
        score,
        levelDeaths: this.runtime.levelDeaths + 1,
      });
    });
  }

  private completeLevel(): void {
    if (this.runtime.finished || this.player.getData("finishing")) return;
    this.player.setData("finishing", true);
    playTone("finish", this.options.settings);
    const secondsSpent = Math.floor((Date.now() - this.runtime.levelStartedAt) / 1000);
    const timeBonus = Math.max(0, 500 - secondsSpent * 10);
    const noDeathBonus = this.runtime.levelDeaths === 0 ? 500 : 0;
    const earned = 1000 + this.levelCoins * 100 + timeBonus + noDeathBonus;
    const completedLevels = this.runtime.completedLevels + 1;
    const score = this.runtime.score + earned;
    const totalCoins = this.runtime.totalCoins + this.levelCoins;

    if (this.options.mode === "endless") {
      this.runtime = { ...this.runtime, score: score + 1000, totalCoins, completedLevels };
      return this.finishGame(true, "Arena ditaklukkan!", "Kamu berhasil mencapai ujung kekacauan.");
    }
    if (this.runtime.currentLevel >= totalStoryLevels - 1) {
      this.runtime = { ...this.runtime, score, totalCoins, completedLevels };
      return this.finishGame(true, "Kamu menang!", "Lantainya masih dendam, tetapi kamu resmi lolos.");
    }
    this.flashMessage(`LEVEL ${this.runtime.currentLevel + 1} CLEAR!`);
    this.time.delayedCall(500, () => {
      this.scene.restart({
        ...this.runtime,
        currentLevel: this.runtime.currentLevel + 1,
        completedLevels,
        score,
        totalCoins,
        levelDeaths: 0,
      });
    });
  }

  private restartLevel(): void {
    if (this.runtime.finished) return;
    this.scene.restart({
      ...this.runtime,
      score: Math.max(0, this.runtime.score - 100),
      levelDeaths: this.runtime.levelDeaths + 1,
    });
  }

  private togglePause(): void {
    if (this.runtime.finished) return;
    if (this.physics.world.isPaused) {
      this.physics.world.resume();
      if (this.pausedAt !== null) this.runtime.pausedTotal += Date.now() - this.pausedAt;
      this.pausedAt = null;
      this.pushHud("Gas lagi!");
    } else {
      this.physics.world.pause();
      this.pausedAt = Date.now();
      this.pushHud("Game dijeda.");
    }
  }

  protected elapsedMs(): number {
    const currentPause = this.pausedAt === null ? 0 : Date.now() - this.pausedAt;
    return Math.max(0, Date.now() - this.runtime.startedAt - this.runtime.pausedTotal - currentPause);
  }

  protected pushHud(message?: string): void {
    this.lastHudPush = Date.now();
    this.options.callbacks.onHud({
      score: this.runtime.score + this.levelCoins * 100,
      level: this.options.mode === "endless" ? 1 : this.runtime.currentLevel + 1,
      totalLevels: this.options.mode === "endless" ? 1 : totalStoryLevels,
      deaths: this.runtime.deaths,
      durationMs: this.elapsedMs(),
      coins: this.runtime.totalCoins + this.levelCoins,
      mode: this.options.mode,
      paused: this.physics.world.isPaused,
      message,
    });
  }

  protected flashMessage(message: string): void {
    if (!this.messageText) return;
    this.messageText.setText(message).setAlpha(1).setScale(0.92);
    this.tweens.killTweensOf(this.messageText);
    this.tweens.add({
      targets: this.messageText,
      alpha: 0,
      scale: 1.04,
      duration: this.options.settings.reducedMotion ? 250 : 900,
      ease: "Quad.easeOut",
    });
    this.options.callbacks.onMessage(message);
  }

  protected finishGame(won: boolean, title: string, flavorText: string): void {
    if (this.runtime.finished) return;
    this.runtime.finished = true;
    this.physics.world.pause();
    const completionBonus = won && this.options.mode !== "endless" ? 2000 : 0;
    const multiplier = this.options.mode === "one-life" ? 1.5 : this.options.mode === "speedrun" ? 1.2 : 1;
    const finalScore = Math.round((this.runtime.score + completionBonus) * multiplier);
    const result: GameResult = {
      id: createId(),
      playerName: this.options.playerName,
      score: finalScore,
      levelReached: this.options.mode === "endless" ? 1 : this.runtime.currentLevel + 1,
      completedLevels: this.runtime.completedLevels,
      deaths: this.runtime.deaths,
      durationMs: this.elapsedMs(),
      characterId: this.options.character.id,
      mode: this.options.mode,
      createdAt: new Date().toISOString(),
      won,
      title,
      flavorText,
    };
    this.options.callbacks.onFinish(result);
  }
}

export function createArcadeGame(options: ArcadeGameOptions): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent: options.parent,
    width: 1280,
    height: 720,
    transparent: true,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: { gravity: { x: 0, y: 1100 }, debug: false },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1280,
      height: 720,
    },
    scene: [new TrapGameScene(options)],
    input: { activePointers: 3 },
  });
}

export async function createMultiplayerGame(options: ArcadeGameOptions & { playerId: string; sendSync: (sync: any) => void }): Promise<Phaser.Game> {
  const { MultiplayerScene } = await import("@/game/multiplayer-scene");
  const scene = new MultiplayerScene(options);
  scene.setPlayerId(options.playerId);
  scene.setSendSync(options.sendSync);
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent: options.parent,
    width: 1280,
    height: 720,
    transparent: true,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: { gravity: { x: 0, y: 1100 }, debug: false },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1280,
      height: 720,
    },
    scene: [scene],
    input: { activePointers: 3 },
  });
}

