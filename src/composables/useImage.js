import { ref, computed } from 'vue'

export default function useImage() {
    const imageUrl = ref('')
    const isUploading = ref(false)

    const onFileChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        imageUrl.value = ''
        isUploading.value = true

        const reader = new FileReader()
        reader.onload = () => {
            imageUrl.value = reader.result
            isUploading.value = false
        }
        reader.onerror = () => {
            isUploading.value = false
        }
        reader.readAsDataURL(file)
    }

    const imageUploaded = computed(() => {
        return imageUrl.value !== ''
    })

    return {
        onFileChange,
        imageUrl,
        imageUploaded,
        isUploading
    }
}
