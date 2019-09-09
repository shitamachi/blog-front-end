import React from "react"

interface IArchiveState {
    title: string
    createDateTime: string
}

class Archive extends React.Component<{}, IArchiveState> {
    readonly state = {title: "", createDateTime: ""}

    componentDidMount(): void {

    }
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return undefined
    }
}
