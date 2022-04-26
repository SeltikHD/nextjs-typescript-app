import { useEffect, useState } from "react";

export function Loading({ text = 'Loading', rotate = true, vanishing = false, customBG, customIcon }: { text?: string, rotate?: boolean, vanishing?: boolean, customBG?: string, customIcon?: string }) {

    return (
        <>{text}</>
    );
}