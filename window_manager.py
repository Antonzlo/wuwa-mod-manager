import keyboard.mouse
import webview
import pydirectinput
import win32con
import win32gui
import win32api
import keyboard
window=None

def set_window_opacity(window_title, opacity):
    hwnd = find_window_by_title(window_title)
    if hwnd == 0 or not hwnd:
        print(f"Window with title '{window_title}' not found.")
        return
    # Set the window to be layered
    win32gui.SetWindowLong(hwnd, win32con.GWL_EXSTYLE, win32gui.GetWindowLong(hwnd, win32con.GWL_EXSTYLE) | win32con.WS_EX_LAYERED)
    # Set the opacity
    win32gui.SetLayeredWindowAttributes(hwnd, 0, int(opacity * 255), win32con.LWA_ALPHA)

def set_on_top():
    global window
    try:
        if get_focused_window_title()=="WuWa Mod Manager":
            hwnd=find_window_by_title("Wuthering Waves")
            if(hwnd):
                activate_window(hwnd)
            else:
                window.minimize()
            return
       
        window.restore()
        if(find_window_by_title("WuWa Mod Manager")!=None):
            window.on_top=True
            window.on_top=False
            keyboard.mouse.click()
    except:
        print("Error: Window not found or not focused.")
        return

def open_webview(type):
    global window
    window=webview.create_window("WuWa Mod Manager", "http://127.0.1:2110/", width=int(win32api.GetSystemMetrics(0)*0.8), height=int(win32api.GetSystemMetrics(1)*0.8), resizable=True,on_top=True ,frameless=True if type==1 else False,fullscreen=True if type==2 else False)
    window.on_top=False
    webview.start()
    # window.expose

def initialize_opacity(opacity):
    set_window_opacity("WuWa Mod Manager",opacity)

def change_type(type):
    global window
    print(type)
    if window:
        old_window = window
        window=webview.create_window("WuWa Mod Manager", "http://127.0.1:2110/", width=int(win32api.GetSystemMetrics(0)*0.8), height=int(win32api.GetSystemMetrics(1)*0.8), resizable=True,on_top=True,frameless=True if type==1 else False,fullscreen=True if type==2 else False)
        old_window.destroy()
        window.on_top=False


def get_focused_window_title():
    """Retrieves the title of the currently focused window."""
    hwnd = win32gui.GetForegroundWindow()
    return win32gui.GetWindowText(hwnd)

def find_window_by_title(title_substring):
    """
    Return the handle of the first top‐level window whose title contains the given substring.
    """
    def enum_handler(hwnd, found):
        if win32gui.IsWindowVisible(hwnd):
            text = win32gui.GetWindowText(hwnd)
            if title_substring.lower() in text.lower():
                found.append(hwnd)
    hwnds = []
    win32gui.EnumWindows(enum_handler, hwnds)
    return hwnds[0] if hwnds else None


def activate_window(hwnd):
    """
    Bring the window to the front and give it keyboard focus.
    """
    # If minimized, restore it
    win32gui.ShowWindow(hwnd, win32con.SW_RESTORE)
    # Bring to foreground
    win32gui.SetForegroundWindow(hwnd)
    #
    # foreground_thread = win32process.GetWindowThreadProcessId(win32gui.GetForegroundWindow())[0]
    # target_thread     = win32process.GetWindowThreadProcessId(hwnd)[0]
    # if foreground_thread != target_thread:
    #     win32gui.SetForegroundWindow(hwnd)


def press_f10():
    """
    Send a single F10 keystroke via pydirectinput.
    """
    print("Pressing F10")
    pydirectinput.press('f10')

