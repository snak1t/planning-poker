module Card = {
  [@bs.module "antd/es/card/index"]
  external antCard: ReasonReact.reactClass = "default";

  [@bs.deriving abstract]
  type jsProps = {
    title: string,
    actions: array(ReasonReact.reactElement),
    style: option(ReactDOMRe.Style.t),
  };

  let make =
      (
        ~title: string,
        ~actions: array(ReasonReact.reactElement),
        ~style=?,
        children,
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=antCard,
      ~props=jsProps(~title, ~actions, ~style),
      children,
    );
};

module Icon = {
  [@bs.module "antd/es/icon"]
  external icon: ReasonReact.reactClass = "default";

  type icon =
    | PlayCircle
    | Delete;

  let convertIconToString = (i: icon): string =>
    switch (i) {
    | PlayCircle => "play-circle"
    | Delete => "delete"
    };

  [@bs.deriving abstract]
  type jsProps = {
    _type: string,
    onClick: option(ReactEvent.Mouse.t => unit),
  };

  let make = (~_type: icon, ~onClick=?, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=icon,
      ~props=jsProps(~_type=convertIconToString(_type), ~onClick),
      children,
    );
};