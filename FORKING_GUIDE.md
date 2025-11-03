# Forking Guide: Adapting for Different Games

This guide explains how to fork this mod manager for different games that use GameBanana for mod distribution.

## Overview

The mod manager has been designed to be easily configurable for different games. All game-specific settings are centralized in configuration files, making it straightforward to adapt the manager for games like Genshin Impact, Honkai: Star Rail, or other GameBanana-supported games.

## Step-by-Step Guide

### 1. Fork the Repository

1. Click the "Fork" button on GitHub to create your own copy
2. Clone your forked repository:
   ```sh
   git clone https://github.com/YOUR_USERNAME/wuwa-mod-manager.git
   cd wuwa-mod-manager
   ```

### 2. Configure Game Settings

Edit the `src/default.json` file to set your game's configuration:

```json
{
  "version": "2.0.4",
  "dir": "",
  "game": {
    "name": "Your Game Name",
    "gameId": YOUR_GAME_ID,
    "categories": {
      "skins": YOUR_SKINS_CATEGORY_ID,
      "ui": YOUR_UI_CATEGORY_ID,
      "other": YOUR_OTHER_CATEGORY_ID
    },
    "modLoaderPath": "\\Path\\To\\Your\\Mod\\Loader",
    "executablePath": "Path\\To\\Executable.exe"
  },
  ...
}
```

#### Finding GameBanana IDs

**Game ID:**
- Visit your game's GameBanana page (e.g., `https://gamebanana.com/games/8552` for Genshin Impact)
- The number in the URL (8552) is your game ID

**Category IDs:**
- Visit the mods page for your game (e.g., `https://gamebanana.com/mods/games/8552`)
- Click on category tabs (Skins, UI, etc.)
- The URL will show category IDs (e.g., `https://gamebanana.com/mods/cats/6891`)
- The number (6891) is your category ID

**Example for Genshin Impact:**
```json
"game": {
  "name": "Genshin Impact",
  "gameId": 8552,
  "categories": {
    "skins": 6891,
    "ui": 7078,
    "other": 6893
  },
  "modLoaderPath": "\\3dmigoto-GIMI-for-playing",
  "executablePath": "3dmigoto-GIMI.exe"
}
```

See `examples/genshin-impact-config.json` for a complete example configuration.

### 3. Update Branding

1. **Application Name**: Edit `src-tauri/tauri.conf.json`:
   ```json
   {
     "productName": "Your Game Mod Manager",
     "identifier": "com.yourdomain.modmanager"
   }
   ```

2. **Icons**: Replace icons in `src-tauri/icons/` with your game's icons:
   - `icon.png` (1024x1024)
   - `128x128.png`
   - `icon64.ico`
   - `icon.icns` (for macOS)

3. **Window Title**: Edit the title in `src-tauri/tauri.conf.json`:
   ```json
   "windows": [{
     "title": "your-game-mod-manager"
   }]
   ```

### 4. Update README

Edit `ReadMe.md` to reflect your game:
- Change all references from "Wuthering Waves" to your game name
- Update screenshots in the `preview/` folder
- Modify the feature descriptions to match your game's mod ecosystem

### 5. Update Constants (Optional)

For more extensive customization, you may want to update:

1. **src/utils/consts.ts**: Contains hardcoded category fallbacks (TEMP_CAT)
2. **Text strings**: Update game-specific terminology in language files

### 6. Test Your Configuration

1. Install dependencies:
   ```sh
   npm install
   ```

2. Run in development mode:
   ```sh
   npx tauri dev
   ```

3. Verify:
   - Categories load correctly from GameBanana
   - Mod paths are detected properly
   - Downloads and installations work

### 7. Build and Distribute

Build your customized mod manager:
```sh
npx tauri build
```

The installer will be in `src-tauri/target/release/bundle/`

## Category Management

The mod manager automatically fetches categories from GameBanana using your configured game ID. However, you can customize the display:

### Default Categories

The three main categories (Skins, UI, Other) are defined in your config. These appear as top-level filters in the UI.

### Dynamic Categories

Character-specific and other subcategories are fetched automatically from GameBanana's API based on your `categories.skins` ID.

### Fallback Categories

If the network fetch fails, the app uses hardcoded categories from `TEMP_CAT` in `src/utils/consts.ts`. You should update this array with your game's categories for offline functionality.

## Common Issues

### Categories Not Loading

- Verify your game ID and category IDs are correct
- Check GameBanana API is accessible
- Review browser console for API errors

### Mod Path Not Found

- Ensure `modLoaderPath` matches your mod loader's installation structure
- The path should be relative to the user's AppData directory

### Executable Not Launching

- Verify `executablePath` is correct relative to the mod loader path
- Ensure the executable name matches exactly (case-sensitive)

## Support

If you create a fork for a popular game, consider:
- Documenting game-specific setup instructions
- Creating installation guides for your game's mod loader
- Linking back to this original project

## License

This project is open source. Please respect the original license when creating forks.
