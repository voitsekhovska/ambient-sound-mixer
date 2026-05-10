export class PresetManager {
  constructor() {
    this.customPresets = this.loadCustomPresets();
  }

  // Load presets from local storage
  loadCustomPresets() {
    const stored = localStorage.getItem("ambientMixerPresets");
    return stored ? JSON.parse(stored) : {};
  }

  // Load custom preset by id
  loadPreset(presetId) {
    return this.customPresets[presetId] || null;
  }

  // Save custom presets to local storage
  saveCustomPresets() {
    localStorage.setItem(
      "ambientMixerPresets",
      JSON.stringify(this.customPresets),
    );
  }

  // Save current mix as a preset
  savePreset(name, soundStates) {
    const presetId = `custom-${Date.now()}`;

    // Create preset object with only active sounds
    const preset = {
      name,
      sounds: {},
    };

    for (const [soundId, volume] of Object.entries(soundStates)) {
      if (volume > 0) {
        preset.sounds[soundId] = volume;
      }
    }
    this.customPresets[presetId] = preset;
    this.saveCustomPresets();

    return presetId;
  }

  // Check if the preset name exists
  presetNameExists(name) {
    return Object.values(this.customPresets).some(
      (preset) => preset.name === name,
    );
  }
}
