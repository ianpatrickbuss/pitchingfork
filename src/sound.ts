import {writable} from 'svelte/store';

export const sound = writable<Date | string>('');
