// to show tooltip text on icons

import { PlacesType, Tooltip } from "react-tooltip"

export interface HintProps {
    id: string;
    place: PlacesType;
    className?: string;
}

export const Hint = ({
    id,
    place,
    className
}: HintProps) => {
    return (
        <Tooltip
            id={id}
            place={place}
            style={{ backgroundColor: "black" }}
            className={className}
            noArrow
        />
    )
}