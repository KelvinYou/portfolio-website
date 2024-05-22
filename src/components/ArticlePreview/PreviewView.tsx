import ButtonStyle from './ButtonStyle'

export default function PreviewView({ showPreview, handleSetShowPreview }: any) {
  return (
    <button onClick={() => handleSetShowPreview(!showPreview)}>
      <ButtonStyle buttonEmoji="👀" buttonText="View" buttonActive={!showPreview} />
    </button>
  )
}
