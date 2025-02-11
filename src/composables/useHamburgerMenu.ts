import { ref } from 'vue'

const menuOpen = ref(false)

export function useHamburgerMenu() {
    const openMenu = () => {
        menuOpen.value = true
    }

    const closeMenu = () => {
        menuOpen.value = false
    }

    const toggleMenu = () => {
        menuOpen.value = !menuOpen.value
    }

    return {
        menuOpen,
        openMenu,
        closeMenu,
        toggleMenu
    }
} 