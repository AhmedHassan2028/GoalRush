export default function LoadingSpinner() {
  return (
    <div
      role='status'
      className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]'
    >
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
