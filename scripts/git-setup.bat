@echo off
REM Woochive Git Setup Script for Windows
REM This script helps you set up Git repository and push to GitHub

echo.
echo ================================
echo Woochive Git Setup Script
echo ================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [OK] Git is installed
git --version
echo.

REM Check if already initialized
if exist .git (
    echo [WARNING] Git repository already initialized
    set /p continue="Do you want to continue? (y/n): "
    if /i not "%continue%"=="y" exit /b 0
) else (
    echo [INFO] Initializing Git repository...
    git init
    git branch -M main
    echo [OK] Git repository initialized
)

echo.

REM Check git config
for /f "delims=" %%i in ('git config user.name') do set git_name=%%i
for /f "delims=" %%i in ('git config user.email') do set git_email=%%i

if "%git_name%"=="" (
    set /p git_name="Enter your name: "
    git config --global user.name "%git_name%"
)

if "%git_email%"=="" (
    set /p git_email="Enter your email: "
    git config --global user.email "%git_email%"
)

echo [OK] Git user: %git_name% ^<%git_email%^>
echo.

REM Create initial commit
echo [INFO] Creating initial commit...
git add .
git commit -m "Initial commit: Woochive portfolio website with admin CMS"
if %ERRORLEVEL% EQU 0 (
    echo [OK] Initial commit created
) else (
    echo [INFO] No changes to commit
)

echo.

REM Check for remote
git remote | findstr origin >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Remote 'origin' already exists
    for /f "delims=" %%i in ('git remote get-url origin') do set remote_url=%%i
    echo Remote URL: %remote_url%
    set /p change="Do you want to change it? (y/n): "
    if /i "%change%"=="y" (
        set /p repo_url="Enter GitHub repository URL: "
        git remote set-url origin "%repo_url%"
        echo [OK] Remote URL updated
    )
) else (
    echo [INFO] Setting up remote repository...
    set /p github_user="Enter your GitHub username: "
    set /p repo_name="Enter repository name (default: woochive): "
    if "%repo_name%"=="" set repo_name=woochive
    
    echo.
    echo Choose connection method:
    echo 1) HTTPS (recommended)
    echo 2) SSH (requires SSH key setup)
    set /p method="Enter choice (1 or 2): "
    
    if "%method%"=="2" (
        set repo_url=git@github.com:%github_user%/%repo_name%.git
    ) else (
        set repo_url=https://github.com/%github_user%/%repo_name%.git
    )
    
    git remote add origin "%repo_url%"
    echo [OK] Remote 'origin' added: %repo_url%
)

echo.
echo ================================
echo Ready to push to GitHub!
echo ================================
echo.
echo Next steps:
echo 1. Create repository on GitHub: https://github.com/new
echo    - Repository name: woochive (or your chosen name)
echo    - Don't initialize with README, .gitignore, or license
echo.
echo 2. Run: git push -u origin main
echo.
echo Or press any key to push now...
pause >nul

echo.
echo [INFO] Pushing to GitHub...
git push -u origin main
if %ERRORLEVEL% EQU 0 (
    echo [OK] Successfully pushed to GitHub!
    echo.
    echo All done! Check your repository on GitHub.
) else (
    echo [ERROR] Failed to push to GitHub
    echo Please check your credentials and try again
)

echo.
pause
