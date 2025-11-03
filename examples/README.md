# Example Configurations

This directory contains example configuration files for adapting the mod manager to different games.

## Usage

1. Copy the example config to `src/default.json`
2. Customize as needed for your specific setup
3. Rebuild the application

## Available Examples

### Genshin Impact (`genshin-impact-config.json`)

Configuration for using this mod manager with Genshin Impact mods from GameBanana.

**Key Settings:**
- Game ID: 8552
- Skins Category: 6891
- UI Category: 7078
- Other Category: 6893
- Mod Loader: 3dmigoto-GIMI

**Note:** You'll need to have 3dmigoto-GIMI installed in your AppData directory for this to work properly.

## Contributing

If you've successfully adapted this mod manager for another game, consider contributing your configuration as an example! Submit a pull request with:
- Your game's config JSON file
- A brief description of any special considerations
- Links to the mod loader and game resources

See [FORKING_GUIDE.md](../FORKING_GUIDE.md) for more details on creating configurations.
