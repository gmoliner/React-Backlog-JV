import useBacklog from "../../providers/BacklogProvider";
import BacklogList from "./BacklogList";
import BacklogResume from "./BacklogResume";

export default function BacklogHome() {
  const backlogContext = useBacklog()
  const backlog = backlogContext.backlog

  return (
    <>
    <BacklogResume backlog={backlog}></BacklogResume>
    <hr />
    <BacklogList backlog={backlog}></BacklogList>
    </>
  )
}