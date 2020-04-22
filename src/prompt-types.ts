export interface StandardPrompt {
    kind: "StandardPrompt"
    type: string;
    name: string;
    optional: boolean;
}

export interface CustomPrompt {
    kind: "CustomPrompt"
    type: string,
    name: string
}
