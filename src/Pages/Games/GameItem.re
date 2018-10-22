open Ant;

let component = ReasonReact.statelessComponent("GameItem");

let make =
    (
      ~title: string,
      ~description: string,
      ~id: string,
      ~onNavigateToTask: string => unit,
      ~onDeleteGame: string => unit,
      _children,
    ) => {
  let onPlay = _e => onNavigateToTask(id);
  let onDelete = _e => onDeleteGame(id);
  let renderDescription = (desc: string) =>
    ReasonReact.string(
      switch (desc) {
      | "" => "There is no description"
      | _ => desc
      },
    );
  {
    ...component,
    render: _self =>
      <Card
        style={ReactDOMRe.Style.make(~margin="0.4rem", ())}
        title
        actions=[|
          <Icon _type=Icon.PlayCircle onClick=onPlay />,
          <Icon _type=Icon.Delete onClick=onDelete />,
        |]>
        {renderDescription(description)}
      </Card>,
  };
};

[@bs.deriving abstract]
type jsProps = {
  title: string,
  description: string,
  onNavigateToTask: string => unit,
  onDeleteGame: string => unit,
  _id: string,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~title=jsProps##title,
      ~description=jsProps##description,
      ~id=jsProps##_id,
      ~onNavigateToTask=jsProps##onNavigateToTask,
      ~onDeleteGame=jsProps##onDeleteGame,
      [||],
    )
  );