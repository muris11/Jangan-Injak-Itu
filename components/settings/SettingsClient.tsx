/* eslint-disable react-hooks/set-state-in-effect -- Browser-only settings are intentionally hydrated after mount. */
"use client";

import { useEffect, useState } from "react";
import { characters } from "@/game/data/characters";
import {
  defaultSettings,
  getCharacterId,
  getPlayerName,
  getSettings,
  resetAllData,
  saveCharacterId,
  savePlayerName,
  saveSettings,
  validateName,
} from "@/lib/storage";
import type { CharacterId, GameSettings } from "@/types/game";
import { Toast } from "@/components/ui/Toast";
import { VolumeIcon } from "@/components/ui/Icons";

export function SettingsClient() {
  const [name, setName] = useState("");
  const [characterId, setCharacterId] = useState<CharacterId>("bro");
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setName(getPlayerName());
    setCharacterId(getCharacterId());
    setSettings(getSettings());
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function updateSetting<K extends keyof GameSettings>(key: K, value: GameSettings[K]) {
    const next = { ...settings, [key]: value };
    setSettings(next);
    saveSettings(next);
  }

  function saveProfile() {
    const nameValidation = validateName(name);
    if (nameValidation) return setError(nameValidation);
    setError(null);
    savePlayerName(name.trim());
    saveCharacterId(characterId);
    setToast("Pengaturan pemain disimpan.");
  }

  function resetData() {
    if (!window.confirm("Hapus nama, pengaturan, dan semua leaderboard lokal? Tindakan ini tidak dapat dibatalkan.")) return;
    resetAllData();
    setName("");
    setCharacterId("bro");
    setSettings(defaultSettings);
    setToast("Semua data lokal telah dihapus.");
  }

  return (
    <>
      <main className="container-game py-10 md:py-14">
        <header className="mb-9">
          <p className="mb-3 text-xs font-black uppercase tracking-[.26em] text-secondary">Preferensi perangkat</p>
          <h1 className="display-font text-3xl text-primary sm:text-5xl">Settings</h1>
          <p className="mt-4 max-w-xl leading-7 text-muted">Semua perubahan disimpan lokal di browser ini, tanpa akun dan tanpa dikirim ke server.</p>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="neon-panel p-5 sm:p-7">
            <h2 className="mb-6 text-xl font-black">Player</h2>
            <label className="form-label mb-6">
              Nama pemain
              <input className="text-input" value={name} maxLength={16} onChange={(event) => setName(event.target.value)} placeholder="Masukkan nama" />
              {error ? <span className="text-danger">{error}</span> : null}
            </label>
            <p className="mb-3 text-sm font-bold text-muted">Karakter default</p>
            <div className="mb-7 grid gap-2">
              {characters.map((character) => (
                <button key={character.id} className={`character-card ${characterId === character.id ? "selected" : ""}`} type="button" onClick={() => setCharacterId(character.id)}>
                  <strong>{character.name}</strong>
                  <small>{character.description}</small>
                </button>
              ))}
            </div>
            <button className="primary-button w-full" type="button" onClick={saveProfile}>Simpan Player</button>
          </section>

          <div className="grid gap-5">
            <section className="neon-panel p-5 sm:p-7">
              <h2 className="mb-6 flex items-center gap-3 text-xl font-black"><VolumeIcon className="h-6 w-6 text-secondary" /> Audio & Visual</h2>
              <label className="form-label mb-6">
                Volume sound effect: {Math.round(settings.sfxVolume * 100)}%
                <input className="range-input" type="range" min={0} max={1} step={0.05} value={settings.sfxVolume} onChange={(event) => updateSetting("sfxVolume", Number(event.target.value))} />
              </label>
              <label className="form-label mb-6">
                Opacity tombol HP: {Math.round(settings.mobileControlsOpacity * 100)}%
                <input className="range-input" type="range" min={0.45} max={1} step={0.05} value={settings.mobileControlsOpacity} onChange={(event) => updateSetting("mobileControlsOpacity", Number(event.target.value))} />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="mode-card !min-h-16 cursor-pointer">
                  <span className="flex items-center justify-between"><strong>Mute SFX</strong><input type="checkbox" checked={settings.muted} onChange={(event) => updateSetting("muted", event.target.checked)} /></span>
                </label>
                <label className="mode-card !min-h-16 cursor-pointer">
                  <span className="flex items-center justify-between"><strong>Reduced Motion</strong><input type="checkbox" checked={settings.reducedMotion} onChange={(event) => updateSetting("reducedMotion", event.target.checked)} /></span>
                </label>
              </div>
            </section>

            <section className="neon-panel border-danger/30 p-5 sm:p-7">
              <h2 className="mb-3 text-xl font-black text-danger">Danger Zone</h2>
              <p className="mb-6 text-sm leading-6 text-muted">Menghapus data akan menghilangkan nama, karakter, settings, dan seluruh high score lokal pada browser ini.</p>
              <button className="danger-button w-full" type="button" onClick={resetData}>Reset Semua Data Lokal</button>
            </section>
          </div>
        </div>
      </main>
      <Toast message={toast} />
    </>
  );
}
