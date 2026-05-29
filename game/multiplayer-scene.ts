import Phaser from "phaser";
import { TrapGameScene, type ArcadeGameOptions } from "@/game/create-game";
import type { PlayerSync } from "@/types/game";

interface OtherPlayer {
  sprite: Phaser.Physics.Arcade.Sprite;
  label: Phaser.GameObjects.Text;
  id: string;
}

export class MultiplayerScene extends TrapGameScene {
  private otherPlayers = new Map<string, OtherPlayer>();
  private playerId = "";
  private synced = false;

  constructor(options: ArcadeGameOptions) {
    super(options);
  }

  setPlayerId(id: string) {
    this.playerId = id;
  }

  onPlayersSync(syncs: PlayerSync[]) {
    for (const sync of syncs) {
      if (sync.id === this.playerId) continue;
      let other = this.otherPlayers.get(sync.id);
      if (!other) {
        const sprite = this.physics.add.sprite(sync.x, sync.y, "player");
        const label = this.add.text(sync.x, sync.y - 40, sync.name.slice(0, 8), {
          fontSize: "12px",
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 3,
        }).setOrigin(0.5);
        other = { sprite, label, id: sync.id };
        this.otherPlayers.set(sync.id, other);
      }
    }
    for (const [id, other] of this.otherPlayers) {
      if (!syncs.find((s) => s.id === id)) {
        other.sprite.destroy();
        other.label.destroy();
        this.otherPlayers.delete(id);
      }
    }
    this.synced = true;
  }

  updateOtherPlayers(syncs: PlayerSync[]) {
    for (const sync of syncs) {
      if (sync.id === this.playerId) continue;
      const other = this.otherPlayers.get(sync.id);
      if (other) {
        other.sprite.setPosition(sync.x, sync.y);
        other.sprite.setFlipX(sync.facingLeft);
        other.label.setPosition(sync.x, sync.y - 40);
        if (!sync.alive) other.sprite.setAlpha(0.3);
        else other.sprite.setAlpha(1);
      }
    }
  }

  override update(): void {
    super.update();
  }
}
