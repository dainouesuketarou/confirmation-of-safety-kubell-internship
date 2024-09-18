import { TextButton } from "../TextButton";

import { useDialog } from ".";

const style = {
  width: "100px",
  height: "30px",
};

export function ExampleLayout() {
  const [Dialog, openDialog, closeDialog] = useDialog();

  return (
    <>
      <TextButton buttonType="primary" text="Open" onClick={openDialog} style={style} />
      <Dialog>
        <p>This is a dialog</p>
        <button onClick={closeDialog}>Close Dialog</button>
      </Dialog>
    </>
  );
}
