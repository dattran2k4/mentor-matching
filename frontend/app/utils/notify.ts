export const notify = {
  error(message: string) {
    // Replace with your toast library later (sonner/react-toastify/notistack...)
    console.error(message)
  },
  success(message: string) {
    console.log(message)
  }
}
