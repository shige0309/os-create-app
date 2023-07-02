import "./HomeMain.css"

export const HomeMain = ({image}: {image: string}) => {
  return (
    <div className="homeMain">
        <p className="homeMain-mv"><img src={`/${image}`} alt="" /></p>
    </div>
  )
}
