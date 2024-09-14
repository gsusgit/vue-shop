import { ref, computed } from 'vue'
import { useFirebaseStorage } from 'vuefire'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { uid } from 'uid'

export default function useImage() {
    const storage = useFirebaseStorage()
    const imageUrl = ref('')
    const isUploading = ref(false)

    const onFileChange = e => {
        const file = e.target.files[0]
        const fileName = uid() + '.jpg'
        const sRef = storageRef(storage, '/products/' + fileName)
        const uploadTask = uploadBytesResumable(sRef, file)

        // Reset state
        imageUrl.value = ''
        isUploading.value = true

        uploadTask.on('state_changed',
            null,
            (error) => {
                console.log(error)
                isUploading.value = false
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        imageUrl.value = url
                        isUploading.value = false
                    })
            })
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
