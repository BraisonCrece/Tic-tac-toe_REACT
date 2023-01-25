export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = isSelected ? 'square is-selected' : 'square'

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}