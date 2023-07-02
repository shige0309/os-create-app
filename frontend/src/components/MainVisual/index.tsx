import "./MainVisual.css"

export const MainVisual = (props : {image: string}) => {
  return (
    <div className="c-mainVisual">
        <p className="c-mainVisual-mv"><img src={`/${props.image}`} alt="" /></p>
    </div>
  )
}
