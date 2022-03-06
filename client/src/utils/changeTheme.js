export function changeTheme(theme) {

    switch (theme) {
        case 'light':
            window.localStorage.setItem('theme', 'light')
            document.documentElement.classList.remove('dark');
            break;
        case 'dark':
            document.documentElement.classList.add('dark');
            window.localStorage.setItem('theme', 'dark')
            break;
        default:
            break;
    }

}