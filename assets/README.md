# STEP Tools GUI

Professional Windows application for STEP file manipulation.

## Features

### 1. Simplify Tool
- Remove small parts and features
- Volume-based filtering
- Size-based filtering
- Presets: Light, Medium, Heavy
- Real-time file size comparison

### 2. Scale Tool
- Absolute sizing (set exact dimensions)
- Increment mode (add/subtract from current size)
- Independent axis scaling
- Non-uniform scaling support
- Preview current dimensions

### 3. Workflow (Combined Operations)
- Chain multiple operations
- Simplify → Solidify → Compress
- Maximum file size reduction
- Progress tracking

## Building

### Requirements
- Qt 5.9.2+ with MinGW
- OpenCASCADE 7.3.0 (GCC build)
- Windows 10+

### Build Steps

```batch
cd C:\TMD_2\STEP_Tools_GUI
.\build.bat
```

This will:
1. Run qmake to generate Makefiles
2. Compile the application
3. Copy required OCCT DLLs
4. Create `STEP_Tools_GUI.exe`

## Usage

### Simplify Tab
1. Select input STEP file
2. Choose output location
3. Set minimum volume and size thresholds
4. Click "Simplify STEP File"

**Presets:**
- Light (1 mm³, 0.5 mm) - Remove tiny features
- Medium (10 mm³, 1 mm) - **Recommended**
- Heavy (100 mm³, 5 mm) - Aggressive cleanup

### Scale Tab
1. Select input and output files
2. Choose mode:
   - **Absolute**: Set exact target dimensions
   - **Increment**: Add/subtract from current size
3. Enter width, length (and optionally height)
4. Click "Scale STEP File"

**Examples:**
- Absolute: Enter `600, 600` for exact 600x600mm
- Increment: Enter `200, 0` to add 200mm to width only

### Workflow Tab
1. Select input file and output directory
2. Check desired operations
3. Configure parameters for each operation
4. Click "Run Workflow"

## Distribution

### Creating Standalone Package

```batch
# Create distribution folder
mkdir STEP_Tools_Package
copy STEP_Tools_GUI.exe STEP_Tools_Package\
copy *.dll STEP_Tools_Package\

# Copy Qt DLLs
windeployqt STEP_Tools_Package\STEP_Tools_GUI.exe
```

The resulting folder can be zipped and distributed to other users.

## File Locations

```
C:\TMD_2\STEP_Tools_GUI\
├── STEP_Tools_GUI.exe     (Main executable)
├── *.dll                  (OCCT and Qt libraries)
├── mainwindow.cpp/.h      (UI implementation)
├── step_processor.cpp/.h  (Processing logic)
├── main.cpp               (Entry point)
└── STEP_Tools_GUI.pro     (Qt project file)
```

## Troubleshooting

### Missing DLLs
Run `build.bat` again - it will copy all required DLLs.

### Qt Not Found
Update paths in `STEP_Tools_GUI.pro`:
```
QTDIR=C:\Qt\5.9.2\mingw53_32
MINGW_DIR=C:\Qt\Tools\mingw810_64
```

### OCCT Errors
Verify OCCT path in `.pro` file:
```
OCCT_DIR = C:/TMD_2/tmd_2/occt-7.3.0
```

## Technical Details

- **Framework**: Qt 5.9.2 Widgets
- **3D Engine**: OpenCASCADE 7.3.0
- **Compiler**: MinGW GCC 8.1.0
- **Architecture**: 64-bit
- **File Format**: STEP AP214IS

## License

Internal tool for TMD project.
