"use client";

import { characters } from "@/game/data/characters";
import { modes } from "@/lib/game-copy";
import type { CharacterId, GameMode } from "@/types/game";
import { PlayIcon } from "@/components/ui/Icons";

type Props = {
  name: string;
  error: string | null;
  mode: GameMode;
  characterId: CharacterId;
  storageAvailable: boolean;
  onName: (value: string) => void;
  onMode: (mode: GameMode) => void;
  onCharacter: (id: CharacterId) => void;
  onStart: () => void;
};

export function PlaySetup({ name, error, mode, characterId, storageAvailable, onName, onMode, onCharacter, onStart }: Props) {
  return (
    <section className="container-game py-9 md:py-14">
      <div className="mb-9 text-center">
        <p className="mb-3 text-xs font-black uppercase tracking-[.24em] text-secondary">Siapkan kekacauan</p>
        <h1 className="display-font text-3xl text-primary sm:text-5xl">Pilih dulu, bro.</h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-muted">Masukkan nama, pilih karakter, lalu tentukan bagaimana kamu ingin dipermainkan jebakan.</p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[.75fr_1.25fr]">
        <div className="neon-panel p-5 sm:p-6">
          <h2 className="mb-5 text-lg font-black">Pemain</h2>
          <label className="form-label mb-5">
            Nama kamu
            <input
              className="text-input"
              maxLength={16}
              placeholder="Contoh: Muris"
              value={name}
              onChange={(event) => onName(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter") onStart(); }}
            />
            {error ? <span className="text-sm text-danger">{error}</span> : <span className="text-xs font-normal text-muted">2–16 karakter, disimpan hanya di browser kamu.</span>}
          </label>
          <h3 className="mb-3 text-sm font-black uppercase tracking-[.13em] text-muted">Pilih karakter</h3>
          <div className="grid gap-2">
            {characters.map((character) => (
              <button
                className={`character-card ${character.id === characterId ? "selected" : ""}`}
                key={character.id}
                type="button"
                onClick={() => onCharacter(character.id)}
              >
                <strong>{character.name}</strong>
                <small>{character.description}</small>
              </button>
            ))}
          </div>
        </div>
        <div className="neon-panel p-5 sm:p-6">
          <h2 className="mb-5 text-lg font-black">Mode Permainan</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {modes.map((item) => (
              <button className={`mode-card ${item.id === mode ? "selected" : ""}`} key={item.id} type="button" onClick={() => onMode(item.id)}>
                <span className="flex items-center justify-between gap-2">
                  <strong>{item.name}</strong>
                  <small className="rounded-full bg-white/7 px-2 py-1">{item.label}</small>
                </span>
                <small>{item.description}</small>
              </button>
            ))}
          </div>
          {!storageAvailable ? (
            <p className="mt-5 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm text-warning">
              Browser memblokir localStorage. Game tetap bisa dimainkan, tetapi skor tidak akan tersimpan.
            </p>
          ) : null}
          <button className="primary-button mt-7 w-full" type="button" onClick={onStart}>
            <PlayIcon className="h-5 w-5" /> Gas Main
          </button>
        </div>
      </div>
    </section>
  );
}
