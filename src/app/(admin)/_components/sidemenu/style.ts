
export const sidebarTheme = (isDark: boolean) => {
  return {
    light: {
      sidebar: {
        backgroundColor: 'transparent',
        color: '#0F172A',
      },
      menu: {
        menuContent: '#fff',
        icon: isDark ? '#FFF' : '#000',
        hover: {
          backgroundColor: '#c5e4ff',
          color: '#44596e',
        },
        disabled: {
          color: '#9fb6cf',
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: '#0b2948',
        color: '#FFF',
      },
      menu: {
        menuContent: '#F00',
        icon: '#FFF',
        hover: {
          backgroundColor: '#DFF1FF',
          color: '#b6c8d9',
        },
        disabled: {
          color: '#3e5e7e',
        },
      },
    },
  }
}