import { ref } from 'vue'

const showToast = ref(false)
const message = ref('')
const color = ref('')

export default function useToast() {
    const show = (msg, type, duration = 3000) => {
        console.log(msg, type)
        message.value = msg
        color.value = type
        showToast.value = true
        setTimeout(() => {
            hide()
        }, duration)
    };

    const hide = () => {
        showToast.value = false
    };

    return {
        showToast,
        message,
        color,
        show,
        hide
    }
}
