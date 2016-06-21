export interface Option {
	type: string;
	label: string;
	action?: string;
}

export interface Message {
		title: string;
		message?: string;
		messageComponent?: any;
		options: Array<Option>;
		inputs?: any;
}
