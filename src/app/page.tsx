'use client';
/* eslint-disable @next/next/no-img-element */
import md5 from 'md5';
import { useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import grid from './grid.json';

interface ScrollPosition {
	x: number;
	y: number;
}

interface GridProps {
	grid: any;
	level?: number;
	id?: string;
}

function simpleHashRGBA(input: string, alpha: number) {
	// hash input to a hex string
	const hash = md5(input);
	// convert hash to a bytes
	const bytes = new Uint8Array(hash.match(/.{2}/g)!.map(c => parseInt(c, 16)));
	// convert bytes uint8array to a hex string
	const hex = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
	// Modulus 0xFFFFFF to keep the number in the range [0, 0xFFFFFF] (use BigInt)
	const number = BigInt(`0x${hex}`) % BigInt(0xFFFFFF);
	// convert number to a hex string
	const color = number.toString(16).padStart(6, '0');
	// convert hex string to an array of 3 numbers
	const [r, g, b] = color.match(/.{2}/g)!.map(c => parseInt(c, 16));
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function RecursiveGrid({ grid, id = '', level = 0 }: GridProps) {
	const [hoverElement, setHoverElement] = useState<number | null>(null);

	return (
		<div style={{
			display: 'grid',
			gridTemplateColumns: 'repeat(2, 1fr)',
			gridTemplateRows: 'repeat(2, 1fr)',
			width: '100%',
			height: '100%',
			gridGap: '0',
		}}>
			{typeof grid["1"] !== 'undefined' ?
				<RecursiveGrid grid={grid["1"]} id={id + '1'} level={level + 1} /> :
				<div
					style={{
						boxSizing: 'border-box',
						width: '100%',
						height: '100%',
						backgroundImage: `url(https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/${Math.floor(1000 / Math.pow(2, level))}x${Math.floor(1000 / Math.pow(2, level))})`,
						border: hoverElement === 1 ? '1px solid red' : 'none',
					}}
					onMouseEnter={() => setHoverElement(1)}
					onMouseLeave={() => setHoverElement(null)}
				/>
			}
			{typeof grid["2"] !== 'undefined' ?
				<RecursiveGrid grid={grid["2"]} id={id + '2'} level={level + 1} /> :
				<div
					style={{
						boxSizing: 'border-box',
						width: '100%',
						height: '100%',
						backgroundImage: `url(https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/${Math.floor(1000 / Math.pow(2, level))}x${Math.floor(1000 / Math.pow(2, level))})`,
						border: hoverElement === 2 ? '1px solid red' : 'none',
					}}
					onMouseEnter={() => setHoverElement(2)}
					onMouseLeave={() => setHoverElement(null)}
				/>
			}
			{typeof grid["3"] !== 'undefined' ?
				<RecursiveGrid grid={grid["3"]} id={id + '3'} level={level + 1} /> :
				<div
					style={{
						boxSizing: 'border-box',
						width: '100%',
						height: '100%',
						backgroundImage: `url(https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/${Math.floor(1000 / Math.pow(2, level))}x${Math.floor(1000 / Math.pow(2, level))})`,
						border: hoverElement === 3 ? '1px solid red' : 'none',
					}}
					onMouseEnter={() => setHoverElement(3)}
					onMouseLeave={() => setHoverElement(null)}
				/>
			}
			{typeof grid["4"] !== 'undefined' ?
				<RecursiveGrid grid={grid["4"]} id={id + '4'} level={level + 1} /> :
				<div
					style={{
						boxSizing: 'border-box',
						width: '100%',
						height: '100%',
						backgroundImage: `url(https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/${1000 / Math.pow(2, level)}x${1000 / Math.pow(2, level)})`,
						border: hoverElement === 4 ? '1px solid red' : 'none',
					}}
					onMouseEnter={() => setHoverElement(4)}
					onMouseLeave={() => setHoverElement(null)}
				/>
			}
		</div>
	);
}

export default function Home() {
	return (
		<MapInteractionCSS>
			<div
				style={{
					width: '250rem',
					height: '250rem',
					top: '0px',
					left: '0px',
				}}
			>
				<RecursiveGrid grid={grid} />
			</div>
		</MapInteractionCSS>

	);
};
