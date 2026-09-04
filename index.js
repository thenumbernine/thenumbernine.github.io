import {merge, A, Article, Br, Div, H3, Img, P, Span} from './js/dom.js';

// TODO eventually, but I don't feel like throwing away multi-line-strings, non-bracket-keys, and comments. .. because json is a stupid format, when it could have gone so far ....
//import jsonData from './projects.json' with { type: 'json' };

// add background-popup-on-mouseover-preview
const preview = Div({
	style : {
		position : 'absolute',
		display : 'none',
		zIndex : '-9999',
		opacity : .3,
	},
	appendTo : document.body,
});

const previewImg = Img({
	events : {
		load : e => {
			refreshPreviewWidth();
		},
	},
	appendTo : preview,
});

const refreshPreviewWidth = () => {
	// 256 x 256
	//const w = previewImg.naturalWidth + 'px';
	//const h = previewImg.naturalHeight + 'px';
	// fixed at 512 x 512 ... TODO force aspect ratio of original, divide by min of dims or something
	//const w = 512, h = 512;
	const w = window.innerWidth - 128;
	const h = w;
	previewImg.style.width = w + 'px';
	previewImg.style.height = h + 'px';
};

window.addEventListener('resize', e => {
	refreshPreviewWidth();
});

/*
each will have...
	href
	img (optional)
	title (used for img alt or for div data-preview-nopic text content
	desc (html content)
	tags
*/
class Project {
	constructor(args) {
		merge(this, args);
	}
}
class ProjectHTML extends Project {
	dom() {
		return Div({
			innerHTML : this.innerHTML,
		})
	}
}
class ProjectThumb extends Project {
	dom() {
/*
		return Div({
			children : [
				A({
					href : this.href,
					children : [
						this.img
						? Img({
							src : this.img,
							alt : this.title,
							events : {
								mouseover : e => {
									const img = e.target;
									const r = img.getBoundingClientRect();
									const x = 64 + Math.floor(r.left + window.scrollX);
									const y = Math.max(64, -128 + Math.floor(r.top + window.scrollY));
									preview.style.display = 'block';
									preview.style.left = x + 'px';
									preview.style.top = y + 'px';
									previewImg.src = img.src;
								},
								mouseout : e => {
									// clear background on mouseout?
									//preview.style.display = 'none';
								},
							},
						})
						: Div({
							attrs : {['data-preview-nopic'] : ''},
							innerText : this.title,
							events : {
								mouseover : e => {
									preview.style.display = 'none';
								},
							},
						})
					],
				}),
				Span({
					innerHTML : ' ' +this.desc,
				}),
				Br(),
				Br()
			],
		});
*/
		return Article({
			classList : ['card'],
			children : [
				Div({
					classList : ['card-image-wrapper'],
					children : []
					.concat(
						this.img
						? Img({
							classList : ['card-image'],
							src : this.img,
							alt : this.title,
						}) : [],
					),
				}),
				Div({
					classList : ['card-content'],
					children : [
						Span({
							classList:['card-tag'].concat((this.tags ?? []).map(tag => 'tag-'+tag)),
							innerText : (this.tags ?? []).join(', '),
						}),
						H3({
							classList:['card-title'],
							children : [
								A({
									href : this.href,
									classList : ['main-card-link'],
									innerText : this.title,
								}),
							],
						}),
						P({
							classList:['card-description'],
							innerText : this.desc,
						}),
					],
				}),
			],
		});
	}
}

const projects = [
	// TODO these should be in the main section ...
/*
	// sort by language?

	new ProjectThumb({
		title:'Lua',
		desc:`Lua projects / libraries / frameworks`,
	}),
	new ProjectThumb({
		title:'C++',
		desc:`C++ projects / libraries / frameworks`,
	}),
	new ProjectThumb({
		title:'JavaScript',
		desc:`JavaScript projects / libraries / frameworks`,
	}),

	// sort by subject?

	new ProjectThumb({
		title:'Math',
		desc:`Math pages`,
	}),
	new ProjectThumb({
		title:'CFD',
		desc:`Integration schemes of PDEs of Computational Fluid Dynamics, Electromagnetism, and the fabric of spacetime`,
	}),
	new ProjectThumb({
		title:'Astronomy',
		desc:`Various astronomy tools I've made`,
	}),
	new ProjectThumb({
		title:'Games',
		desc:`Games or tools for games`,
	}),
*/
	// ... and these should be in subsections:

	new ProjectThumb({
		href:'math.html',
		img:'thumbnails/math-worksheets.png',
		title:'math worksheets',
		desc:`Various math worksheets I've typed up into LaTeX/MathJax. They tend to mirror the topics of the SymMath automatically-generated html output and its mixed html + live output <code>.symmath</code> pages.`,
		tags:['math'],
	}),
	new ProjectThumb({
		href:'symmath/index.html',
		img:'thumbnails/symmath.png',
		title:'symmath-lua',
		desc:`SymMath, a symbolic math tool (aka "computer algebra system") especially targeted for tensor-index-manipuplation (physics tensors, not stupid AI tensors) and code-generation.
Includes lots of examples with application to cosmology, general relativity, numerical relativity, hydrodynamics, Maxwell equations, and hyperbolic conservation laws.`,
		tags:['math','lua','cas','bignumber'],
	}),
	new ProjectThumb({
		href:'4d-renderer/',
		img:'thumbnails/4d-renderer.png',
		title:'4D renderer',
		desc:`4D-mesh-renderer, especially for rendering 4D-voxels, applied to rendering a layout of a 4D hypercube, in WebGL.`,
		tags:['math','js','webgl'],
	}),
	new ProjectThumb({
		href:'conway-life-webgl/',
		img:'thumbnails/conway-life-webgl.png',
		title:"conway's life in webgl",
		desc:`Conway's Life, running on GPU in WebGL.`,
		tags:['math','js','webgl','gpgpu','automata'],
	}),
	new ProjectThumb({
		href:'metric/',
		img:'thumbnails/metric.png',
		title:'metric space visualizer',
		desc:`Manifold property visualization tool, in JavaScript in-browser with WebGL.`,
		tags:['math','js','webgl','diff-geom'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-metric',
		title:'lua-metric',
		desc:`lua+imgui version of the html+emscripten+lua version of the lua version of my metric / diff geom visualization tool`,
		tags:['luajit','diff-geom'],
	}),
	new ProjectThumb({
		href:'octonion-multiplication-table/',
		img:'thumbnails/octonion-multiplication-table.png',
		title:'octonion multiplication table',
		desc:`Visualization of the sub-quaternion multiplication tables found within the Octonions, aligned to a Mobius-strip, in WebGL.`,
		tags:['math','js','webgl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/cayley-dickson',
		title:'cayley-dickson',
		desc:`Simple script to generate dot files of cayley-dickson multiplication tables.
Includes a visualizer of relations of nested basis, quaternions, octonions, etc, based on my force-directed-graph repo.`,
		tags:['lua','math'],
	}),
	new ProjectThumb({
		href:'poisson-solver/',
		img:'thumbnails/poisson-solver.png',
		title:'poisson solver',
		desc:`Very simple finite-difference Poisson solver on GPU in WebGL.`,
		tags:['math','js','webgl','gpgpu'],
	}),
	new ProjectThumb({
		href:'topple/',
		img:'thumbnails/topple.png',
		title:'abelian sandpile model in webgl',
		desc:`Abelian sandpile models on the GPU in WebGL.`,
		tags:['math','js','webgl','gpgpu','automata'],
	}),
	new ProjectThumb({
		href:'universe/',
		img:'thumbnails/universe.png',
		title:'cosmic web visualization in WebGL.',
		desc:`Visualizer of various galaxy surveys.  Useful for visualizing the cosmic web structure.`,
		tags:['astronomy','js','webgl'],
	}),
	new ProjectThumb({
		href:'solarsystem/',
		img:'thumbnails/solarsystem.png',
		title:'solar system visualization in WebGL',
		desc:`Solar system visualizer in WebGL.  Includes planets, moons, small-bodies, comets, meteors, stars, exoplaents, and galaxies.`,
		tags:['astronomy','js','webgl'],
	}),
	new ProjectThumb({
		href:'wavefunction/',
		img:'thumbnails/wavefunction.png',
		title:'wavefunction visualization in WebGL',
		desc:`Hydrogen atom wavefunction visualization in WebGL.`,
		tags:['astronomy','js','webgl','volume-render'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/earth-magnetic-field-lua',
		//img:'thumbnails/earth-magnetic-field.png',
		img:'https://raw.githubusercontent.com/thenumbernine/earth-magnetic-field-lua/master/pics/pic4.png',
		title:'earth magnetic field',
		desc:`Various visualizations of the WMM 2025 dataset, including LIC, vector field.  Applied to various basis options of the Earth geographic chart, with options for interpolation between them.`,
		tags:['astronomy','geography','opengl','luajit','langfix'],
	}),
	new ProjectThumb({
		href:'black-hole-skymap/',
		img:'thumbnails/black-hole-skymap.png',
		title:'black hole skymap',
		desc:`Black hole raytracer on GPU, in WebGL.  There is also an offline LuaJIT+OpenGL version, accessible by my luajit-in-browser project.`,
		tags:['astronomy','js','webgl','luajit','raytrace'],
	}),
	new ProjectThumb({
		href:'hydrodynamics/',
		img:'thumbnails/hydrodynamics.png',
		title:'hydrodynamics in WebGL',
		desc:`Various CFD schemes, including HLL and Roe, implemented in CPU and GPU (WebGL), in-browser, in JavaScript.`,
		tags:['cfd','finite-volume','js','webgl','cpu','gpgpu'],
	}),
	new ProjectThumb({
		href:'thomas-precession/',
		img:'thumbnails/thomas-precession.png',
		title:'thomas precession visualization',
		desc:`Very ugly and shoddy Thomsas-precession visualizer.`,
		tags:['astronomy','js','webgl'],
	}),
	new ProjectThumb({
		href:'time-dilation/',
		img:'thumbnails/time-dilation.png',
		title:'time dilation visualization',
		desc:`Shoddy time dilation / Twin-Paradox visualizer.`,
		tags:['astronomy','js','webgl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/numo9',
		img:'thumbnails/numo9.png',
		title:'NuMo9',
		desc:`A Fantasy-Console, somewhere between Pico-8 compatible, 16-bit-era, and voxelmap-engine.`,
		tags:['games','luajit','langfix','fantasy-console','voxel','hd2d','multiplayer'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/ff6lib-lua',
		img:'thumbnails/ff6lib.png',
		title:'FF6lib',
		desc:`Editor of Final Fantasy VI USA for SNES.`,
		tags:['games','ff6','luajit','snes','randomizer','romhacking'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/farm-game',
		img:'thumbnails/farm-game.png',
		title:'farm game',
		desc:`The start of a farm simulator in the vein of Harvest Moon, except with voxel engine.`,
		tags:['games','luajit','voxel'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/zeta-lua',
		img:'thumbnails/zeta2d.png',
		title:'zeta',
		desc:`2D platformer engine, with built-in editor.`,
		tags:['games','luajit','platformer','multiplayer'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/sand-attack',
		img:'thumbnails/sand-attack.png',
		title:'sand-attack',
		desc:`Sand-Tetris clone.  Connect colored lines of falling sand.`,
		tags:['games','luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/chess-on-manifold-lua',
		img:'thumbnails/chess-on-manifold.png',
		title:'chess on a manifold',
		desc:`What would it be like to play chess on an arbitrary mesh manifold?`,
		tags:['games','luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/pong-lua',
		img:'thumbnails/pong.png',
		title:'super-pong',
		desc:`Pong, in LuaJIT+SDL, running in a browser.  Succeeded by its implementation in NuMo9 Fantasy Console.`,
		tags:['games','luajit'],
	}),
	new ProjectThumb({
		href:'bank-steam/',
		img:'thumbnails/bank-game.png',
		title:'bank game',
		desc:`A block-pushing puzzle game.`,
		tags:['games','puzzle','numo9'],
	}),
	new ProjectThumb({
		href:'elemental/',
		img:'thumbnails/elemental-game.png',
		title:'elemental puzzle game',
		desc:`A color-matching puzzle game.  Succeeded by its implementation in NuMo9 Fantasy Console.`,
		tags:['games','js','webgl'],
	}),
	new ProjectThumb({
		href:'space-game/',
		img:'thumbnails/space-game.png',
		title:'space game',
		desc:`A simple 3D-bullet-hell game running on the GPU in WebGL.`,
		tags:['games','js','webgl'],
	}),
	new ProjectThumb({
		href:'stupidrpg-game/',
		img:'thumbnails/stupidrpg-game.png',
		title:'stupid rpg game',
		desc:`A stupid RPG game that runs in browser, written in Javascript.  Succeded by its implementation in NuMo9 Fantasy Console.`,
		tags:['games','js','webgl','dungeon-crawl','button-mash'],
	}),
	new ProjectThumb({
		href:'lua/stupid-text-rpg/',
		img:'thumbnails/stupid-text-rpg.png',
		title:'stupid text TRPG game',
		desc:`A stupid Tactical-RPG game with ASCII display, written in Lua, running in-browser.  Yes there is a NuMo9 version, but it uses graphics instead of ASCII.  But it used to use ASCII...`,
		tags:['games','lua','trpg','lua-wasm'],
	}),
	new ProjectThumb({
		href:'swinekeeper/',
		img:'thumbnails/swinekeeper.png',
		title:'swinekeeper game',
		desc:`Minesweeper but with custom kernels used to count neighboring mines.`,
		tags:['games','js'],
	}),
	new ProjectThumb({
		href:'dominion/',
		img:'thumbnails/dominion.png',
		title:'dominion deck chooser',
		desc:`Dominion deck chooser with a useful touch-screen interface.`,
		tags:['games','js'],
	}),
	new ProjectThumb({
		href:'mario-kart-wii-stat-picker/',
		img:'thumbnails/mario-kart-wii-stat-picker.png',
		title:'mario kart wii stat picker',
		desc:`Mario Kart Wii stat picker.  Choose what stats you want to maximize/minimize (and what weighted combinations) and it will rank karts accordingly.`,
		tags:['games','js'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/fftrpg-numo9',
		title:'fftrpg-numo9',
		img:"https://img.youtube.com/vi/EUv8v0D50rg/0.jpg",
		desc:`(private repo) Mashup of Final Fantasy 6 and Final Fantasy Tactics, implemented in NuMo9.  Check the NuMo9 discord server for updates.`,
		tags:['games','luajit','ff6','fft','trpg','voxel'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/webtactics',
		title:'webtactics',
		desc:`(private repo) Browser+server based tactical-rpg game.  Succeeded by FF6T3D in the NuMo9 discord server.`,
		tags:['games','js','lua','trpg'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/TacticsLua',
		title:'TacticsLua',
		desc:`(private repo) Pure-LuaJIT Tactical-RPG implementation of Final Fantasy Tactics, and then a mash-up of Final Fantasy 6 in TRPG environment. Succeeded by FF6T3D in the NuMo9 discord server.`,
		tags:['games','luajit','opengl','ff6','trpg'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/dungeons-n-munchers-lua',
		title:'dungeons-n-munchers-lua',
		desc:`I had a crazy idea to make Number Munchers multiplayer, roguelike, and going all the way up to graduate-level math...`,
		tags:['games','js','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/dungeons-n-munchers-js',
		title:'dungeons-n-munchers-js',
		desc:`I had a crazy idea to make Number Munchers multiplayer, roguelike, and going all the way up to graduate-level math... This was succeded by my lua version.`,
		tags:['games','js','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/zeta-js',
		title:'zeta-js',
		desc:`Very very preliminary start of a procedural platformer in javascript.`,
		tags:['games','js','platformer'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/biggun-quake',
		title:'biggun-quake',
		desc:`A quake 1 mod I made.`,
		tags:['games','quake'],
	}),
	new ProjectThumb({
		href:'glapp/',
		img:'thumbnails/glapp-js.png',
		title:'glapp luajit framework-in-browser',
		desc:`LuaJIT+SDL3+GLES3+CImGui environment in browser with emscripten, modified Lua-5.4, and forked luaffifb library.`,
		tags:['luajit','browser','js','wasm','emscripten'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-ffi-wasm',
		title:'lua-ffi-wasm',
		desc:`For building Lua + luaffifb to wasm for the browser port of my LuaJIT + OpenGL + SDL framework.
Uses modified Lua 5.4, forked luaffifb, and libffi to accomplish this.`,
		tags:['luajit','lua','luaffifb','libffi','js','wasm','emscripten'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/luaffifb',
		title:'luaffifb',
		desc:`My fork of the old facebookarchive FFI-for-vanilla-Lua.`,
		tags:['luajit','browser','js','wasm','emscripten'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-ffi-for-js',
		title:'lua-ffi-for-js',
		desc:`LuaJIT's FFI library written in pure-lua for use with minimal javascript interface.
This was my original implementation just to be functional, but it is slow.
Superceded by my lua-ffi-wasm project, but still around because it still has its uses.`,
		tags:['luajit','js'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/SDLLuaJIT-android',
		title:'SDLLuaJIT-android',
		desc:`SDL+LuaJIT launcher in Android.  Works as a distict repo and not as a dependency of my LuaJIT-android project.  This inspired me to make LuaJIT-android after seeing how horribly bloated (wasting 100x-1000x the required disk space) all Android projects are.`,
		tags:['android','sdl','luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/LuaJIT-android',
		title:'LuaJIT-android',
		desc:`LuaJIT on android, uses my lua-java project to write android apps in pure LuaJIT.  .dex classes are generated and side-loaded at runtime. No more need for Android Studio!`,
		tags:['android','luajit','lib'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/LuaJIT-android-lib',
		title:'LuaJIT-android-lib',
		desc:`Makefile for cross-compiling luajit library and binary for android`,
		tags:['android','luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/SDL-in-LuaJIT-android',
		title:'SDL-in-LuaJIT-android',
		desc:`This is another SDL-with-LuaJIT-in-Android but instead of running SDL first, it runs LuaJIT first, then SDL within it`,
		tags:['android','luajit','sdl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Bible-android',
		title:'Bible-android',
		desc:`My first example of my LuaJIT-android framework: a Bible app, using a no-studio no-gradle build.  Repo is 100x smaller, apk is 100x smaller, RAM usage is 100x smaller.
How did the modern state of software become so apathetic?`,
		tags:['bible','android','luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-ext',
		title:'lua-ext',
		desc:`useful extensions to Lua base libraries`,
		tags:['lua','luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/http-lua',
		title:'http-lua',
		desc:`simple http server, complete with correct content-types from iana.org`,
		tags:['luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-gui',
		title:'lua-gui',
		desc:`luajit driven widget library for opengl/sdl`,
		tags:['luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-dist',
		title:'lua-dist',
		desc:`create a distributable for a lua/luajit project`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/earthquake-shear-lines',
		title:'earthquake-shear-lines',
		desc:`earthquake shear lines`,
		tags:['luajit','geography','geology'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-ffi-bindings',
		title:'lua-ffi-bindings',
		desc:`LuaJIT FFI bindings based on system headers / C runtime / POSIX.`,
		tags:['luajit','header-bindings'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/include-lua',
		title:'include-lua',
		desc:`LuaJIT FFI binding generation`,
		tags:['luajit','header-bindings'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-imgui',
		title:'lua-imgui',
		desc:`imgui lua wrapper`,
		tags:['luajit','imgui'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-sdl',
		title:'lua-sdl',
		desc:`lua version of SDL app framework`,
		tags:['luajit','sdl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/langfix-lua',
		title:'langfix-lua',
		desc:`Pure-Lua fix for some things in the language, especially missing in LuaJIT`,
		tags:['lua','langfix','parser'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-integrate',
		title:'lua-integrate',
		desc:`integration methods, explicit and implict, implemented in Lua`,
		tags:['lua','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/solarsystem-lua',
		title:'solarsystem-lua',
		desc:`original Lua version of the solarsystem project`,
		tags:['luajit','astronomy'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-url',
		title:'lua-url',
		desc:`yet another url library`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-websocket',
		title:'lua-websocket',
		desc:`WebSocket server using LuaSocket`,
		tags:['luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/hydro-cl-lua',
		title:'hydro-cl-lua',
		img:"https://img.youtube.com/vi/tfMLMxdRid8/0.jpg",
		desc:`yet *another* hydrodynamics/hyperbolic conservation law solver, this one in LuaJIT using OpenCL/OpenGL`,
		tags:['cfd','finite-volume','luajit','gpgpu','volume-render','dynamic-code-generation','general-relativity','numerical-relativity','gravitoelectromagnetics'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/struct-lua',
		title:'struct-lua',
		desc:`helper for generating ffi structs`,
		tags:['luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/zeta3d-lua',
		title:'zeta3d-lua',
		desc:`(private repo) Voxel metroidvania.  I should publicise it but it's probably in a broken state.`,
		tags:['luajit','voxel','metroidvania'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-image',
		title:'lua-image',
		desc:`LuaJIT image save/load library`,
		tags:['luajit','image-loader'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/polynomial-complex-roots',
		title:'polynomial-complex-roots',
		desc:`plotting polynomial roots in complex plane`,
		tags:['luajit','opengl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/chinese-checkers-on-sphere-lua',
		title:'chinese-checkers-on-sphere-lua',
		img:'https://img.youtube.com/vi/rJ9uPaA9v0E/maxresdefault.jpg',
		desc:`Chinese checkers on the surface of various platonic solid based geodesic circles.`,
		tags:['luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/mesh-lua',
		title:'mesh-lua',
		desc:`Lua 3D Mesh library centered around Alias-Wavefront .obj format.`,
		tags:['luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-audio',
		title:'lua-audio',
		desc:`LuaJIT audio bindings, especially around OpenAL, but also comes with .wav file loader.`,
		tags:['luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-cl',
		title:'lua-cl',
		desc:`Lua/OpenCL bindings`,
		tags:['luajit','opencl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-clip',
		title:'lua-clip',
		desc:`lua wrapper for my fork of libclip`,
		tags:['luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/autoupdate-lua',
		title:'autoupdate-lua',
		desc:`working on an auto-updater to go with lua-dist and lua-zip`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/zip-lua',
		title:'zip-lua',
		desc:`libzip Lua classes`,
		tags:['luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-interpreter',
		title:'lua-interpreter',
		desc:`A Lua interpreter in Lua. Complete with upvalue access, for use as a drop-in debugger.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-bit',
		title:'lua-bit',
		desc:`luajit bit compatibility for vanilla lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/solver-lua',
		title:'solver-lua',
		desc:`linear system solvers`,
		tags:['lua','math','optimization','linear-solver'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-jfnk',
		title:'lua-jfnk',
		desc:`Lua implementation of Jacobian-Free Newton-Krylov solver`,
		tags:['lua','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/vec-ffi-lua',
		title:'vec-ffi-lua',
		desc:`Vector class for LuaJIT based on ffi / primitive types.  Capable of nested vector-in-vector for "tensor" constructs.`,
		tags:['luajit','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/vec-lua',
		title:'vec-lua',
		desc:`Vector math library for pure-Lua.  Includes some supporting functionality with lua-parser for AST auto-inlining which has proven to improve performance a bit...`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-template',
		title:'lua-template',
		desc:`Lua Templates`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-stl',
		title:'lua-stl',
		desc:`whatever STL classes I want to implement, but in LuaJIT`,
		tags:['luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-matrix',
		title:'lua-matrix',
		desc:`Matrix class for lua. In the spirit of matlab syntax.  Includes vanilla-Lua and LuaJIT versions.`,
		tags:['lua','luajit','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/luafilesystem',
		title:'luafilesystem',
		desc:`Fork off of sonoro1234's luafilesystem for LuaJIT (which was a fork off spacewander's ...)`,
		tags:['luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-gnuplot',
		title:'lua-gnuplot',
		desc:`Simple wrapper to invoke gnuplot CLI.`,
		tags:['lua','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/complex-lua',
		title:'complex-lua',
		desc:`Lua complex number class, for FFI and vanilla`,
		tags:['lua','luajit','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-app3d',
		title:'lua-app3d',
		desc:`3D-application support classes.  Originally GL/SDL specific, but made generic for use with other graphics libraries and media frameworks.`,
		tags:['luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/cl-cpu-lua',
		title:'cl-cpu-lua',
		desc:`Lua shim layer of OpenCL API to grep .cl code into .c code and invoke gcc/clang.`,
		tags:['luajit','opencl','cpu'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-ffi-c',
		title:'lua-ffi-c',
		desc:`write c code inside your lua code. use gcc and luajit ffi to build and link while you run.`,
		tags:['luajit','c','gcc'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/n-points-lua',
		title:'n-points-lua',
		desc:`N-points evenly spaced on a sphere, with or without repulsive-forces.`,
		tags:['luajit','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/super-metroid-randomizer-lua',
		title:'super-metroid-randomizer-lua',
		desc:`super metroid item / enemy / door randomizer`,
		tags:['luajit','super-metroid','randomizer','snes','romhacking'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-plot3d',
		title:'lua-plot3d',
		desc:`3D interactive plotting program. got sick of gnuplot's 3D graph display running at &lt;1 fps.`,
		tags:['luajit','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-plot2d',
		title:'lua-plot2d',
		desc:`2d interactive plotting program based on luajit`,
		tags:['luajit','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-lua',
		title:'lua-lua',
		desc:`LuaJIT bindings for LuaJIT.  Allows your LuaJIT state to access itself and/or create sub-states.`,
		tags:['lua','luajit'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-thread',
		title:'lua-thread',
		desc:`pthread library in LuaJIT, using lua-lua LuaJIT-states-in-LuaJIT.`,
		tags:['luajit','multithreading'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-gl',
		title:'lua-gl',
		desc:`OpenGL wrapper classes and SDLApp subclass for LuaJIT`,
		tags:['luajit','opengl','gles'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-vk',
		title:'lua-vk',
		desc:`Vulkan wrapper classes and SDLApp subclass for LuaJIT`,
		tags:['luajit','vulkan'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-wgpu',
		title:'lua-wgpu',
		desc:`WebGPU wrapper classes and SDLApp subclass for LuaJIT`,
		tags:['luajit','webgpu'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/git-lua',
		title:'git-lua',
		desc:`useful lua scripts for managing multiple git repositories`,
		tags:['lua','luajit','git','unicode'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-make',
		title:'lua-make',
		desc:`yet *another* build script system`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-ips',
		title:'lua-ips',
		desc:`Lua based IPS file patcher`,
		tags:['luajit','romhacking'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/force-directed-graph-lua',
		title:'force-directed-graph-lua',
		desc:`force directed graph utility in Lua`,
		tags:['luajit','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/geographic-charts-lua',
		title:'geographic-charts-lua',
		desc:`Putting all my common map projections in one place`,
		tags:['luajit','symmath','geography'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/seashell-lua',
		title:'seashell-lua',
		desc:`seashell parametric function class viewer`,
		tags:['luajit','opengl','cubemap','refraction','symmath'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/volume-renderer-lua',
		title:'volume-renderer-lua',
		desc:`LuaJIT volume renderer class, with example of compute-shader-based 3D mandelbrot+julia renderer.`,
		tags:['luajit','math','fractal','volume-render'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/tetris-attack-lua',
		title:'tetris-attack-lua',
		desc:`Tetris attack clone with very little effort put into it.`,
		tags:['games','luajit','tetris-attack'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/following-fdtd-lessons',
		title:'following-fdtd-lessons',
		desc:`me following some fdtd lessons online`,
		tags:['physics','electromagnetism','fdtd'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-neuralnet',
		title:'lua-neuralnet',
		desc:`neural network classes in Lua`,
		tags:['luajit','neuralnet'],
	}),
	/* private
	new ProjectThumb({
		href:'https://github.com/thenumbernine/3x3-interpolation',
		title:'3x3-interpolation',
		desc:``,
		tags:['lua'],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/browser3d-lua',
		title:'browser3d-lua',
		desc:`Lua+SDL+OpenGL+ImGUI based browser / for remote script execution. Not a HTML/JS browser, those are dumb.`,
		tags:['luajit','network','sdl','opengl','imgui'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/surface-from-connection-lua',
		title:'surface-from-connection-lua',
		desc:`reconstructing surfaces from a rectangular grid of connection coefficients`,
		tags:['luajit','math','diff-geom'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-math',
		title:'lua-math',
		desc:`lua common math functions`,
		tags:['lua','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/moldwars',
		title:'moldwars',
		desc:`performance testing some GL + SDL + LuaJIT code`,
		tags:['luajit','multithreading'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/gravitational-waves-lua',
		title:'gravitational-waves-lua',
		desc:`1D physics simulation of various finite-volume schemes and equations, including Euler-fluids, ideal-Maxwell, and 1D ADM gravitational waves.`,
		tags:['luajit','finite-volume','general-relativity'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/SphericalHarmonicGraphs',
		title:'SphericalHarmonicGraphs',
		desc:`rendering of spherical harmonic + associated legendre graphs`,
		tags:['luajit','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lambda-cdm-lua',
		title:'lambda-cdm-lua',
		desc:`lambda-CDM model time integrator with gui`,
		tags:['luajit','astronomy','cosmology'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/efesoln-cl-lua',
		title:'efesoln-cl-lua',
		desc:`LuaJIT/OpenCL port of my Einstein Field Equation solver project`,
		tags:['luajit','physics','astronomy','einstein-equations','diff-geom','general-relativity'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/prime-spiral-lua',
		title:'prime-spiral-lua',
		desc:`plot that stupid prime spiral pattern`,
		tags:['luajit','math','primes'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/nbody-gpu-lua',
		title:'nbody-gpu-lua',
		desc:`n-body simulation on gpu in LuaJIT`,
		tags:['luajit','n-body','gravitation','astronomy','physics'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/convert-to-8x8x4bpp',
		title:'convert-to-8x8x4bpp',
		desc:`Messing with algorithms for converting RGB images into SNES format: 8x8 tiles of 4bpp, each tile with a unique upper 4bpp, which index into a 256-bit palette.`,
		tags:['luajit','snes','romhacking'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/earth-transport-network',
		title:'earth-transport-network',
		desc:`Earth transport network I designed based on the Apollyon gasket problem.  Works as an intermediate between a space-elevator and a dyson-sphere.  Powered by planet rotation.`,
		tags:['lua','math','geography'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/seismographic-stations',
		title:'seismographic-stations',
		desc:`thought i would plot the seismo data around the world`,
		tags:['lua','geography'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/rule110-lua',
		title:'rule110-lua',
		desc:`Rule 110 in GLSL in Lua`,
		tags:['lua','automata','gpgpu'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/line-integral-convolution-lua',
		title:'line-integral-convolution-lua',
		desc:`line integral convolution in lua`,
		tags:['lua','math','vector-field','tensor-field'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-gameapp',
		title:'lua-gameapp',
		desc:`putting some things common to games in one place`,
		tags:['lua','games','sdl','imgui','opengl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/waves-in-curved-space',
		title:'waves-in-curved-space',
		desc:`visualization of light cones in arbitrary metrics in 2+1 space`,
		tags:['lua','general-relativity'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/noaa_flares',
		title:'noaa_flares',
		desc:`counting and graphing the number of flares that NOAA posts online`,
		tags:['lua','astronomy'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/mimetypes-lua',
		title:'mimetypes-lua',
		desc:`Lua class to get and cache mime types`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/query-simbad',
		title:'query-simbad',
		desc:`lua lib for querying Simbad`,
		tags:['lua','astronomy'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/noaa_drap',
		title:'noaa_drap',
		desc:`NOAA DRAP query tool`,
		tags:['lua','geography'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/grem-lua',
		title:'grem-lua',
		desc:`(WIP) yet *another* attempt at solving metric using the Einstein field equations specified along a grid`,
		tags:['lua','einstein-equations','general-relativity','optimization','physics'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-netrefl',
		title:'lua-netrefl',
		desc:`synchronizing data across the network`,
		tags:['lua','multiplayer'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/texture-atlas',
		title:'texture-atlas',
		desc:`texture atlas generator`,
		tags:['lua','games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/sphere-grid-lua',
		title:'sphere-grid-lua',
		desc:`sphere grid`,
		tags:['lua','mesh'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/chompman',
		title:'chompman',
		desc:`Pac-Man in 3D.`,
		tags:['lua','games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/ascii-art-vpl',
		title:'ascii-art-vpl',
		desc:`Ascii-art visual programming language.`,
		tags:['lua','languages'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/elf-lua',
		title:'elf-lua',
		desc:`Me poking around ELF format with Lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/tensor-lua',
		title:'tensor-lua',
		desc:`Lua based numerical tensor calculator.  Support for metrics and index notation, summation etc.  Respects valence, unlike the AI kiddos' notion of "tensor" libraries. However it is still numeric and therefore not much use to a physicist.  If you want a symbolic tensor index-notation library then look at SymMath.`,
		tags:['lua','math','numerics'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/space-filling-curve',
		title:'space-filling-curve',
		desc:`space filling curves ... which turned into a L-system project`,
		tags:['lua','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-selfmodify',
		title:'lua-selfmodify',
		desc:`self-modifying code wrapped in a genetic algorithm. lots more buzzwords too.`,
		tags:['lua','ast','genetic-algorithm'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/htmlparser-lua',
		title:'htmlparser-lua',
		desc:`HTML parser in Lua.`,
		tags:['lua','html','parser'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-csv',
		title:'lua-csv',
		desc:`CSV parser in Lua`,
		tags:['lua','csv','parser'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua_to_batch',
		title:'lua_to_batch',
		desc:`utility for converting from Lua scripts to Windows Batch files`,
		tags:['lua','transpile','batch'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua_to_js',
		title:'lua_to_js',
		desc:`Lua to JS transpiler`,
		tags:['lua','transpile','js'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-parser',
		title:'lua-parser',
		desc:`Lua parser and abstract syntax tree in Lua`,
		tags:['lua','parser','ast'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/c-h-parser-lua',
		title:'c-h-parser-lua',
		desc:`C header parser in Lua.  Optionally used by the include-lua project when it doesn't have a compiler with flags to do this automatically.`,
		tags:['luajit','header-bindings'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-java',
		title:'lua-java',
		desc:`LuaJIT access to Java through JNI.  Comes with a Java and Dalvik-Dex assembler and class side-loader.`,
		tags:['luajit','java','runtime-assembler','sideload','java-class','dalvik-dex'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/mono-lua',
		title:'mono-lua',
		desc:`Run mono C# in LuaJIT`,
		tags:['luajit','mono'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/python-lua',
		title:'python-lua',
		desc:`Python bindings and wrappers for LuaJIT`,
		tags:['luajit','python'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/leftargs-lua',
		title:'leftargs-lua',
		desc:`What if function arguments went on the left side instead of the right side of a function call?  This is now a feature of langfix-lua.`,
		tags:['lua','langfix'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/smooth-graph-lua',
		title:'smooth-graph-lua',
		desc:`plot successively smoothed graphs`,
		tags:['lua','gnuplot'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-simplexnoise',
		title:'lua-simplexnoise',
		desc:`LuaJIT simplex noise`,
		tags:['lua','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/fibonacci-modulo',
		title:'fibonacci-modulo',
		desc:`fibonacci sequence modulo plotted on circles`,
		tags:['lua','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/stat-lua',
		title:'stat-lua',
		desc:`some useful classes for gathering statistics`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-threadmanager',
		title:'lua-threadmanager',
		desc:`Simple Lua-thread (aka coroutine)-pool class for Lua.`,
		tags:['lua','resource-manager'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/netcdf-lua',
		title:'netcdf-lua',
		desc:`netcdf luajit class wrapper`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-bignumber',
		title:'lua-bignumber',
		desc:`a big integer / number library`,
		tags:['lua','bignumber'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-svg',
		title:'lua-svg',
		desc:`SVG generation functions for Lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/earth-surface-time-dilation-lua',
		title:'earth-surface-time-dilation-lua',
		desc:`just what you would think`,
		tags:['lua','astronomy','general-relativity'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-resourcecache',
		title:'lua-resourcecache',
		desc:`resource cache`,
		tags:['lua','resource-manager'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/modules-lua',
		title:'modules-lua',
		desc:`chop up code into pieces, only use the parts that are necessary, useful when your compiler compiles everything and compile times are far too slow`,
		tags:['lua','dynamic-code-generation'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/ncurses-lua',
		title:'ncurses-lua',
		desc:`ncurses-lua`,
		tags:['luajit'],
	}),
	/* private
	new ProjectThumb({
		href:'https://github.com/thenumbernine/circle-on-curved-surface',
		title:'circle-on-curved-surface',
		desc:`drawing a set o equal distant points on a flat surface with a gaussian perturbation`,
		tags:['lua'],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/numerical-relativity-codegen',
		title:'numerical-relativity-codegen',
		desc:`code generation for my numerical relativity projects`,
		tags:['lua','physics','general-relativity','numerical-relativity','finite-volume','symmath'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/fullcallstack-lua',
		title:'fullcallstack-lua',
		desc:`lua function wrapper to provide full call stack instead of that abridged nonsense in the default functionality`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/quantize-tiles',
		title:'quantize-tiles',
		desc:`take a picture and quantize the grid-aligned tiles`,
		tags:['lua'],
	}),
	/* deprecated
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-imguiapp',
		title:'lua-imguiapp',
		desc:`subclass of GLApp with the ImGui events in place`,
		tags:['lua'],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/faraday-cage',
		title:'faraday-cage',
		desc:`Calculates EM field around Faraday cage.`,
		tags:['lua','math','physics'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/geo-center-earth',
		title:'geo-center-earth',
		desc:`find the center of the earth by surface area`,
		tags:['lua','geography'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/VectorFieldDecomposition-lua',
		title:'VectorFieldDecomposition-lua',
		desc:`decomposing and annotating vector fields`,
		tags:['lua','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/cfdmeshlua',
		title:'cfdmeshlua',
		desc:`2D Roe scheme on an arbitrary mesh, written in Lua`,
		tags:['lua','mesh','cfd','finite-volume'],
	}),
	/* private
	new ProjectThumb({
		href:'https://github.com/thenumbernine/celestial-gravitomagnetics-lua',
		title:'celestial-gravitomagnetics-lua',
		desc:``,
		tags:['lua'],
	}),
	*/
	/* private
	new ProjectThumb({
		href:'https://github.com/thenumbernine/2048_3D',
		title:'2048_3D',
		desc:``,
		tags:['lua'],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/pi-z-curve',
		title:'pi-z-curve',
		desc:`pi along a z curve`,
		tags:['lua','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/teukolsky-waves',
		title:'teukolsky-waves',
		desc:`Supposed to be a repo on Teukolsky wave math derivations via symmath, but it's empty...`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/regge-lua',
		title:'regge-lua',
		desc:`(WIP) Regge calculus simulation of 1+1 spacetime.  Honestly just me messing around with discrete curvature, I don't think I read any proper literature, or I did but I didn't follow it well enough.`,
		tags:['lua','physics'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/preproc-lua',
		title:'preproc-lua',
		desc:`C preprocessor in Lua`,
		tags:['lua','c','parser'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-profile',
		title:'lua-profile',
		desc:`profiler for lua code`,
		tags:['lua','parser','profiling'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/emoji-lua',
		title:'emoji-lua',
		desc:`Lua but with the keywords, symbols, libraries replaced with emojis.`,
		tags:['lua','unicode'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-local-default',
		title:'lua-local-default',
		desc:`Make Lua use locals-by-default in functions ... with Lua!`,
		tags:['lua','parser'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-0-based',
		title:'lua-0-based',
		desc:`pure-Lua implementation of 0-based tables`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/sql-lua',
		title:'sql-lua',
		desc:`Some SQL table and field classes in Lua for generating SQL commands`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/springs-meh-lua',
		title:'springs-meh-lua',
		desc:`springs or something, meh.`,
		tags:['lua','physics'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/gpu_from_pde-lua',
		title:'gpu_from_pde-lua',
		desc:`(WIP) PDE solver on GPU, all in Lua`,
		tags:['lua','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/all-tensor-muls',
		title:'all-tensor-muls',
		desc:`count all unique tensor products for specific input and output degrees`,
		tags:['lua','math','tensor-algebra'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/obs-buildvideo',
		title:'obs-buildvideo',
		desc:`quick script to convert obs capture .ts into .mp4`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/GalacticRotationCurves_2021Ludwig',
		title:'GalacticRotationCurves_2021Ludwig',
		desc:`Trying to reproduce the graphs from this paper, since the paper itself is not so clear on what equations are used to calculate most of the graphs.  (I believe I've found a few typos in constants in the process of reproducing them...)`,
		tags:['lua','physics','general-relativity','gravitoelectromagnetics'],
	}),
	/* deprecated
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-gles2',
		title:'lua-gles2',
		desc:`Old GLES2 library, superceded by using lua-gl with a OpenGLES2-specific binding header.`,
		tags:['lua'],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-multigrid-poisson',
		title:'lua-multigrid-poisson',
		desc:`multigrid poisson solver, first using my matrix library in Lua, next using my OpenCL wrapper in Lua`,
		tags:['lua','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/thirteen-lua',
		title:'thirteen-lua',
		desc:`solver for the solitaire game 'thirteen'`,
		tags:['lua','cards'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/poker-lua',
		title:'poker-lua',
		desc:`poker in Lua, comes with a stupid AI that you can beat pretty easy`,
		tags:['lua','cards'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/cards-lua',
		title:'cards-lua',
		desc:`simple library for card games`,
		tags:['lua','cards'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/CFDMesh',
		title:'CFDMesh',
		desc:`same as my Lua mesh-based CFD simulation, except now moving it to C++ so it'll run a bit faster`,
		tags:['c++','cfd','finite-volume','physics'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/HydrodynamicsGPU',
		title:'HydrodynamicsGPU',
		img:"https://img.youtube.com/vi/DZb5hh4M2jg/0.jpg",
		desc:`Schemes of Roe, HLL, HLLC, Burgers; Equations of 1D, 2D, 3D; Euler, SRHD, Maxwell, Bona-Masso ADM; Implemented in OpenCL`,
		tags:['c++','cfd','finite-volume','physics','gpgpu','opengl','opencl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Hydrodynamics',
		title:'Hydrodynamics',
		desc:`C++ CFD sim based on Tensor template framework`,
		tags:['c++','cfd','finite-volume','physics','opengl','multithreading'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/NBodyGPU',
		title:'NBodyGPU',
		desc:`yet another N-Body simulation in OpenCL`,
		tags:['c++','astronomy','opengl','gpgpu'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/CellularGPU',
		title:'CellularGPU',
		desc:`OpenCL driven Conway's Game of Life`,
		tags:['c++','automata','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/AsteroidsSPH',
		title:'AsteroidsSPH',
		desc:`asteroids with SPH and maybe other tricks`,
		tags:['c++','smooth-particle-hydrodynamics'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/EinsteinFieldEquationSolution',
		title:'EinsteinFieldEquationSolution',
		desc:`inverse solves G_ab = 8 pi T_ab for the metric tensor g_ab based on primitives used to compute T_ab`,
		tags:['c++','einstein-equations','physics','optimization'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/VolumeTest',
		title:'VolumeTest',
		desc:`numerically verifying formula for volume of any simplex in any dimension`,
		tags:['c++','math'],
	}),
	/* private?
	new ProjectThumb({
		href:'https://github.com/thenumbernine/CubicCurveFonts',
		title:'CubicCurveFonts',
		desc:``,
		tags:['c++'],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/SoftwareRenderer',
		title:'SoftwareRenderer',
		desc:`This is a software implementation of a 3D rasterizer and renderer I made way back during my MSc at Oregon State. I kept meaning to post it and kept forgetting. Until now. It includes software implementations of a few OpenGL features. Linear, normal, and spherical, and a few other texgen features. Linear and nearest texture lookup. I forget all of what else. I provided the Quake1 model rendering source code so you can plug in whatever Quake1 models you want as well.`,
		tags:['c++','visualization','rasterizer'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Topple',
		title:'Topple',
		desc:`create images of Abelian sandpile models`,
		tags:['c++','automata','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Solver',
		title:'Solver',
		desc:`collection of linear and nonlinear solver classes`,
		tags:['c++','math','optimization','linear-solver'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/tripletriadminmax',
		title:'tripletriadminmax',
		desc:`(private repo) Min-max algorithm applied to Final Fantasy 8's Triple-Triad.  It still needs some kind of heuristic, it's not working as well as it should.  Private until I get it in a less shameful state.`,
		tags:['c++','ff8'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/clip',
		title:'clip',
		desc:`I forked someone's libclip to add C bindings to its C++ classes so I could expose it to LuaJIT's FFI.`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/reverse_string_c_cpp_rust',
		title:'reverse_string_c_cpp_rust',
		desc:`reversing a string in c, cpp, and rust, and comparing the resulting binaries and preformances`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/scrabble-solver',
		title:'scrabble-solver',
		desc:`a multithreaded scrabble solver`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/CLCommon',
		title:'CLCommon',
		desc:`library for all OpenCL projects`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Parallel',
		title:'Parallel',
		desc:`c++ asynchronous for-each and reduce operations`,
		tags:['c++','multithreading'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/CLCPU',
		title:'CLCPU',
		desc:`The start of a Lua shim layer of OpenCL API to grep .cl code into .c code and invoke gcc/clang.  Never got as far as the lua implementation, because grepping is easier in a scripting language than in C/C++.`,
		tags:['c++','opencl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/CxxAsLua',
		title:'CxxAsLua',
		desc:`Made analogous C++ classes to Lua functionality, with the intention to eventually be able to write code in one language and run it both in Lua and in C++.`,
		tags:['c++','lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Tensor',
		title:'Tensor',
		desc:`C++ template metaprogram driven differential-geometry math-tensor library.  Complete with implicit multiplication and index-notation operations. Not stupid AI "tensor", which aren't tensors at all, but are just high-dimension tuples of numbers.`,
		tags:['c++','math','diff-geom','tensor-algebra'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/WebGPUApp',
		title:'WebGPUApp',
		desc:`WebGPU C API demo.`,
		tags:['c++','webgpu'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/VulkanApp',
		title:'VulkanApp',
		desc:`Working out a foundation class based on SDLApp for Vulkan projects.`,
		tags:['c++','vulkan'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Relativity',
		title:'Relativity',
		desc:`General relativity 3+1 formalism simulation.  My first attempt, using finite-difference, long before I made a proper framework and libraries surrounding my physics simulations.`,
		tags:['c++','general-relativity','numerical-relativity','physics','einstein-equations'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/worldgen',
		title:'worldgen',
		desc:`procedural world generation`,
		tags:['c++','games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Profiler',
		title:'Profiler',
		desc:`C++ profiling code`,
		tags:['c++','profiling'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/ImGuiCommon',
		title:'ImGuiCommon',
		desc:`Class-wrapper for SDLApp's to use ImGui.`,
		tags:['c++','imgui'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/GLApp',
		title:'GLApp',
		desc:`OOP-izing SDL 3 for GL apps.`,
		tags:['c++','opengl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/ImageProcessing',
		title:'ImageProcessing',
		desc:`gradient domain image processing`,
		tags:['c++','math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Image',
		title:'Image',
		desc:`image loading library in C++. I'm slowly collecting formats.`,
		tags:['c++','image-loader'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/NeuralNet',
		title:'NeuralNet',
		desc:`Simple c++ backprop network class`,
		tags:['c++','neuralnet'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/LuaCxx',
		title:'LuaCxx',
		desc:`C++ OOP wrapper for Lua`,
		tags:['c++','lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/SDLApp',
		title:'SDLApp',
		desc:`Foundation class for SDL applications`,
		tags:['c++','sdl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/GLCxx',
		title:'GLCxx',
		desc:`C++ GL wrapper classes`,
		tags:['c++','opengl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Common',
		title:'Common',
		desc:`common C++ and Make stuff`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/oop-in-c',
		title:'oop-in-c',
		desc:`bored so I'm trying to reproduce C++ classes in C with using ugly macro programming`,
		tags:['c++','c','oop'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/js-util',
		title:'js-util',
		desc:`WebGL oop-ized`,
		tags:['js'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/gl-js',
		title:'gl-js',
		desc:`putting my js WebGL wrapper classes in one place`,
		tags:['js','webgl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/kart-js',
		title:'kart-js',
		desc:`(private) Start on my js port of kart-lua, i.e. the seconds version. Superceded by its NuMo9 implementation.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/kart-lua',
		title:'kart-lua',
		desc:`(private) Go go kart madness, first version, in LuaJIT + OpenGL.  Superceded by its NuMo9 implementation.`,
		tags:['games'],
	}),
	/* private
	new ProjectThumb({
		href:'https://github.com/thenumbernine/socialbrowsing',
		title:'socialbrowsing',
		desc:`Interact with people viewing the same webpage.`,
		tags:['js'],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/MatMulKernelTest',
		title:'MatMulKernelTest',
		desc:`performance test of varying fixed-size matrix multiply kernel executed at each cell in a 256x256 grid`,
		tags:['math'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/DFCrack',
		title:'DFCrack',
		desc:`DFHack port attempt using LuaJIT's cdef in place of the typical intermediate C layer of structs and bindings.`,
		tags:['games','dwarf-fortress'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/bank-game-js',
		title:'bank-game-js',
		desc:`Bank: A bomb block pushing puzzle game`,
		tags:['games'],
	}),
	/* private
	new ProjectThumb({
		href:'https://github.com/thenumbernine/tinyddsloader',
		title:'tinyddsloader',
		desc:`Tiny DDS file loader`,
		//tags:['unsorted'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/ImageMetrics',
		title:'ImageMetrics',
		desc:`CLI for computing various metrics of an image / process surrounding an image`,
		//tags:['unsorted'],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua128',
		title:'lua128',
		desc:`128-bit Lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/wii-sdl-luajit',
		title:'wii-sdl-luajit',
		desc:`Wii devkitPro + LuaJIT + SDL, scripts I found online somewhere.`,
		tags:['luajit','wii','sdl'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/wii-luajit',
		title:'wii-luajit',
		desc:`LuaJIT for Wii / devkitPro, scripts I found online somewhere.`,
		tags:['luajit','wii'],
	}),
	/*
	new ProjectThumb({
		href:'https://github.com/thenumbernine/mmo-js',
		title:'mmo-js',
		desc:`making a mmo or something`,
		tags:['games','js'],
	}),
	*/
	/* private
	new ProjectThumb({
		href:'https://github.com/thenumbernine/magnetometer-js',
		title:'magnetometer-js',
		desc:`magnetometer reading in javascript`,
		tags:['js','geography],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/FFTactics_BlenderPlugin',
		title:'FFTactics_BlenderPlugin',
		desc:`Blender plugin for importing Final Fantasy Tactics .GNS files`,
		tags:['fft','python','blender'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/multiplicative-persistence',
		title:'multiplicative-persistence',
		desc:`multiplicative persistence search`,
		tags:['math'],
	}),
	/* deprecated in favor of the math notebooks
	new ProjectThumb({
		href:'https://github.com/thenumbernine/loop-quantum-gravity',
		title:'loop-quantum-gravity',
		desc:`I'm teaching myself loop quantum gravity and putting the proofs/sources here`,
		tags:['math'],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Sod_exact',
		title:'Sod_exact',
		desc:`exact solution for Sod shock tube test`,
		tags:['math','physics','cfd'],
	}),
	new ProjectHTML({innerHTML:
`<h1>More old repos</h1>
<a href='https://web.archive.org/web/20240811120040/https://christopheremoore.net/'>christopheremoore.net in archive.org</a><br>
<br>
I've got even more old repos on my old website, which now only exists in archive.org, since I am too poor to pay for fees.  Despite programming nearly every day of my life since I was a child, despite having a BSc in Comp Sci and Math and MSc in Comp Sci, despite being a decade ahead of the "deep learning" craze, despite writing my own CAS and numerical relativity GPU simulations that would run on a laptop while the "experts" simulators needed a supercomputer ... I have not had a software job since 2018.<br>
My enemies are gloating over me.  My friends remain silent.  Maybe they were never friends to begin with.
`
	}),
];
const projectsByHref = [];
projects.forEach(p => {
	if (p.href) projectsByHref[p.href] = p;
});

// merge this into projects eventually
// but I dont want to manually do it
// and automatically doing it means using json serialization, which means making lots of formatting sacrifices...
const projectThumbs = {
	['thenumbernine.github.io'] : {branch:'master', pics:["bank-steam/ss1.png", "thumbnails/4d-renderer.png", "thumbnails/bank-game.png", "thumbnails/black-hole-skymap.png", "thumbnails/chess-on-manifold.png", "thumbnails/conway-life-webgl.png", "thumbnails/dominion.png", "thumbnails/earth-magnetic-field.png", "thumbnails/elemental-game.png", "thumbnails/farm-game.png", "thumbnails/ff6lib.png", "thumbnails/glapp-js.png", "thumbnails/hydrodynamics.png", "thumbnails/mario-kart-wii-stat-picker.png", "thumbnails/math-worksheets.png", "thumbnails/metric.png", "thumbnails/numo9.png", "thumbnails/octonion-multiplication-table.png", "thumbnails/poisson-solver.png", "thumbnails/pong.png", "thumbnails/sand-attack.png", "thumbnails/solarsystem.png", "thumbnails/space-game.png", "thumbnails/stupid-text-rpg.png", "thumbnails/stupidrpg-game.png", "thumbnails/swinekeeper.png", "thumbnails/symmath.png", "thumbnails/thomas-precession.png", "thumbnails/time-dilation.png", "thumbnails/topple.png", "thumbnails/universe.png", "thumbnails/wavefunction.png", "thumbnails/zeta2d.png"]},
	['numo9'] : {branch:'master', pics:[
		"2048x2/font.png",
		"2048x2/label.png",
		"bank3d/font.png",
		"bank3d/label.png",
		"bank3d/palette.png",
		"bank3d/sheet.png",
		"bank3d/sheet1.png",
		"bombs/label.png",
		"bombs/palette.png",
		"bombs/sheet.png",
		"bombs/sheet1.png",
		"bombs/tilemap.png",
		"brain/font.png",
		"brain/label.png",
		"brain/palette.png",
		"brain/sheet.png",
		"brain/sheet1.png",
		"brain/tilemap.png",
		"bunny3d/label.png",
		"bunny3d/sheet.png",
		"chopmaze/label.png",
		"chopmaze/palette.png",
		"chopmaze/sheet.png",
		"chopmaze/sheet1.png",
		"chopmaze/tilemap.png",
		"defaultlabel.png",
		"docpics/numo9 icon.png",
		"docpics/test-voxelmap.png",
		"dungeon/font.png",
		"dungeon/label.png",
		"dungeon/palette.png",
		"dungeon/sheet.png",
		"dungeon/sheet1.png",
		"dungeon/tilemap.png",
		"elemental/font.png",
		"elemental/label.png",
		"elemental/palette.png",
		"elemental/sheet.png",
		"elemental/tilemap.png",
		"field/palette.png",
		"field/sheet.png",
		"font.png",
		"hello/label.png",
		"hello/sheet.png",
		"hello/sheet1.png",
		"hello/tilemap.png",
		"infinitris/sheet.png",
		"infinitris/tilemap.png",
		"jumpman/font.png",
		"jumpman/label.png",
		"jumpman/palette.png",
		"jumpman/sheet.png",
		"jumpman/sheet1.png",
		"jumpman/tilemap.png",
		"kart/label.png",
		"kart/palette.png",
		"kart/sheet.png",
		"kart/sheet1.png",
		"kart/sheet2.png",
		"kart/sheet3.png",
		"kart/sheet4.png",
		"kart/sheet5.png",
		"kart/sheet6.png",
		"kart/sheet7.png",
		"kart/sheet8.png",
		"kart/tilemap.png",
		"knots/palette.png",
		"knots/sheet.png",
		"metroidvania/font.png",
		"metroidvania/label.png",
		"metroidvania/palette.png",
		"metroidvania/sheet.png",
		"metroidvania/sheet1.png",
		"metroidvania/tilemap.png",
		"metroidvania_procedural/font.png",
		"metroidvania_procedural/label.png",
		"metroidvania_procedural/palette.png",
		"metroidvania_procedural/sheet.png",
		"metroidvania_procedural/sheet1.png",
		"metroidvania_procedural/tilemap.png",
		"pong/label.png",
		"pong/palette.png",
		"pong/sheet.png",
		"pong/sheet1.png",
		"pong/tilemap.png",
		"s-type/font.png",
		"s-type/label.png",
		"s-type/palette.png",
		"s-type/sheet.png",
		"s-type/sheet1.png",
		"s-type/tilemap.png",
		"shikaku/label.png",
		"snake/label.png",
		"snake/palette.png",
		"snake/sheet.png",
		"snake/tilemap.png",
		"solitaire/font.png",
		"solitaire/label.png",
		"solitaire/palette.png",
		"solitaire/sheet.png",
		"solitaire/sheet2.png",
		"solitaire/tilemap.png",
		"splash.png",
		"stellarcore/label.png",
		"stellarcore/palette.png",
		"stellarcore/sheet.png",
		"stellarcore/sheet1.png",
		"stupid/label.png",
		"stupid/palette.png",
		"stupid/sheet.png",
		"stupid/sheet1.png",
		"stupidtrpg/font.png",
		"stupidtrpg/label.png",
		"stupidtrpg/palette.png",
		"stupidtrpg/sheet.png",
		"stupidtrpg/sheet1.png",
		"stupidtrpg/tilemap.png",
		"survive/label.png",
		"survive/sheet.png",
		"survive/sheet1.png",
		"test-8bppindex/sheet.png",
		"test-brushmap/palette.png",
		"test-brushmap/sheet.png",
		"test-dither/label.png",
		"test-frustum/font.png",
		"test-frustum/label.png",
		"test-frustum/palette.png",
		"test-frustum/sheet.png",
		"test-frustum/sheet1.png",
		"test-frustum/tilemap.png",
		"test-mouse/sheet.png",
		"test-voxelmap/palette.png",
		"test-voxelmap/sheet.png",
		"test-voxelmap/sheet1.png"
	]},
	['fftrpg-numo9'] : {branch:'master', pics:["font.png", "label.png", "palette.png", "palette1.png", "palette10.png", "palette11.png", "palette12.png", "palette13.png", "palette14.png", "palette15.png", "palette16.png", "palette17.png", "palette18.png", "palette19.png", "palette2.png", "palette20.png", "palette21.png", "palette22.png", "palette23.png", "palette24.png", "palette25.png", "palette26.png", "palette27.png", "palette28.png", "palette29.png", "palette3.png", "palette30.png", "palette31.png", "palette32.png", "palette33.png", "palette34.png", "palette35.png", "palette36.png", "palette37.png", "palette38.png", "palette39.png", "palette4.png", "palette40.png", "palette5.png", "palette6.png", "palette7.png", "palette8.png", "palette9.png", "sheet.png", "sheet1.png", "sheet10.png", "sheet11.png", "sheet12.png", "sheet13.png", "sheet14.png", "sheet15.png", "sheet16.png", "sheet17.png", "sheet18.png", "sheet19.png", "sheet2.png", "sheet20.png", "sheet21.png", "sheet22.png", "sheet23.png", "sheet24.png", "sheet25.png", "sheet26.png", "sheet27.png", "sheet28.png", "sheet29.png", "sheet3.png", "sheet30.png", "sheet31.png", "sheet32.png", "sheet33.png", "sheet34.png", "sheet4.png", "sheet5.png", "sheet6.png", "sheet7.png", "sheet8.png", "sheet9.png", "tilemap.png", "tilemap1.png"]},
	['lua-dist'] : {branch:'master', pics:["default-icon.png"]},
	['earthquake-shear-lines'] : {branch:'master', pics:["pics/pic1.png", "earth-color.png", "pics/pic2.png", "pics/pic3.png", "pics/pic4.png", "pics/pic5.png", "pics/pic6.png"]},
	['MathWorksheets'] : {branch:'master', pics:["Antigravity_1.png", "Antigravity_2.png", "Earth Rotation Geodesic Twisting.png", "Global Transport Network/5.png", "Global Transport Network/acc.png", "Global Transport Network/azimuthal equidistant with 3 iters.png", "Global Transport Network/equirectangular tetrahedron base.png", "Global Transport Network/equirectangular with 3 iters - base in south.png", "Global Transport Network/equirectangular with 3 iters.png", "Global Transport Network/mollweide with 3 iters.png", "Global Transport Network/pos.png", "Global Transport Network/single fractal branch with earth in flat-earth view.png", "Global Transport Network/single fractal branch with earth.png", "Global Transport Network/single fractal branch.png", "Global Transport Network/sphere with 3 iters.png", "Global Transport Network/time vs accel in hours log-log.png", "Global Transport Network/time vs accel in hours.png", "Global Transport Network/time vs accel in min.png", "Global Transport Network/time vs accel.png", "Global Transport Network/vel.png", "Kerr geodesic - radial normal magnitude - varying a.png", "Kerr geodesic - radial normal magnitude.png", "a note on the definition of tensors 1.jpg", "balloons-gasses-log.png", "balloons-gasses.png", "flat earth curvature - earth horizon declination angle at 1.5m.png", "flat earth curvature - earth horizon declination angle at 10000m.png", "flat earth curvature - earth horizon declination angle at 3x earth radius.png", "flat earth curvature - earth horizon declination angle at one third of earth radius.png", "sundial-ellipse-perspective-undo.png", "sundial-ellipse.png"]},
	['glapp-js'] : {branch:'master', pics:["pic.png"]},
	['solarsystem-lua'] : {branch:'master', pics:["images/2.png", "images/1.png", "textures/earth.png"]},
	['cryptobot'] : {branch:'master', pics:["latest/public/play.png", "latest/public/reset.png", "latest/public/restore.png", "latest/public/stop.png", "latest/public/trash.png", "latest/space-shiba-icon.png"]},
	['lua-plot2d'] : {branch:'master', pics:["font.png"]},
	['bank-numo9'] : {branch:'master', pics:["animsheet.png", "label.png", "palette.png", "screenshots/ss1.png", "screenshots/ss10.png", "screenshots/ss11.png", "screenshots/ss12.png", "screenshots/ss13.png", "screenshots/ss2.png", "screenshots/ss3.png", "screenshots/ss4.png", "screenshots/ss5.png", "screenshots/ss6.png", "screenshots/ss7.png", "screenshots/ss8.png", "screenshots/ss9.png", "sheet.png", "sheet1.png", "tilemap.png"]},
	['zeta3d-lua'] : {branch:'master', pics:["res/noise.png"]},
	['farm-game'] : {branch:'master', pics:["splash.png"]},
	['lua-image'] : {branch:'master', pics:["tests/test.png"]},
	['mesh-lua'] : {branch:'master', pics:["meshes/hue.png"]},
	['LuaJIT-android'] : {branch:'master', pics:["icon.png"]},
	['lua-gl'] : {branch:'master', pics:["tests/src.png"]},
	['lua-gnuplot'] : {branch:'master', pics:["images/example3.png", "images/example1.png", "images/example2.png"]},
	['black-hole-skymap'] : {branch:'master', pics:["menu.png", "skytex/sky-infrared-cube-xn.png", "skytex/sky-infrared-cube-xp.png", "skytex/sky-infrared-cube-yn.png", "skytex/sky-infrared-cube-yp.png", "skytex/sky-infrared-cube-zn.png", "skytex/sky-infrared-cube-zp.png", "skytex/sky-visible-cube-xn.png", "skytex/sky-visible-cube-xp.png", "skytex/sky-visible-cube-yn.png", "skytex/sky-visible-cube-yp.png", "skytex/sky-visible-cube-zn.png", "skytex/sky-visible-cube-zp.png", "skytex/test-cube-xn.png", "skytex/test-cube-xp.png", "skytex/test-cube-yn.png", "skytex/test-cube-yp.png", "skytex/test-cube-zn.png", "skytex/test-cube-zp.png"]},
	['super-metroid-randomizer-lua'] : {branch:'master', pics:["screenshots/vis4.png", "screenshots/pic1.png", "screenshots/pic10.png", "screenshots/pic11.png", "screenshots/pic12.png", "screenshots/pic13.png", "screenshots/pic14.png", "screenshots/pic2.png", "screenshots/pic3.png", "screenshots/pic4.png", "screenshots/pic5.png", "screenshots/pic6.png", "screenshots/pic7.png", "screenshots/pic8.png", "screenshots/pic9.png", "screenshots/vis1.png", "screenshots/vis2.png", "screenshots/vis3.png"]},
	['chess-on-manifold-lua'] : {branch:'master', pics:["pic.png", "pieces.png"]},
	['lua-plot3d'] : {branch:'master', pics:["font.png"]},
	['TacticsLua'] : {branch:'master', pics:["textures/gui/background-units.png", "textures/gui/close.png", "textures/gui/fieldborder-fft.png", "textures/gui/font-fft-as-is.png", "textures/gui/font-fft.png", "textures/gui/font.png", "textures/gui/intro-background.png", "textures/gui/menubackground-fft.png", "textures/gui/menuborder-2.png", "textures/gui/menuborder-fft.png", "textures/gui/menuborder.png", "textures/gui/menucursor.png"]},
	['SDLLuaJIT-android'] : {branch:'master', pics:["app/src/main/assets/gl/tests/src.png", "app/src/main/assets/image/tests/test.png"]},
	['Bible-android'] : {branch:'master', pics:["icon.png"]},
	['kart-lua'] : {branch:'master', pics:["maps/map1/height.png", "maps/map1/track.png", "maps/smk/original/SuperMarioKart-BattleMode-BattleCourse1.png", "maps/smk/original/SuperMarioKart-BattleMode-BattleCourse2.png", "maps/smk/original/SuperMarioKart-BattleMode-BattleCourse3.png", "maps/smk/original/SuperMarioKart-BattleMode-BattleCourse4.png", "maps/smk/original/SuperMarioKart-FlowerCup-BowserCastle2.png", "maps/smk/original/SuperMarioKart-FlowerCup-ChocoIsland1.png", "maps/smk/original/SuperMarioKart-FlowerCup-DonutPlains2.png", "maps/smk/original/SuperMarioKart-FlowerCup-GhostValley2.png", "maps/smk/original/SuperMarioKart-FlowerCup-MarioCircuit3.png", "maps/smk/original/SuperMarioKart-MushroomCup-BowserCastle1.png", "maps/smk/original/SuperMarioKart-MushroomCup-DonutPlains1.png", "maps/smk/original/SuperMarioKart-MushroomCup-GhostValley1.png", "maps/smk/original/SuperMarioKart-MushroomCup-MarioCircuit1.png", "maps/smk/original/SuperMarioKart-MushroomCup-MarioCircuit2.png", "maps/smk/original/SuperMarioKart-SpecialCup-DonutPlains3.png", "maps/smk/original/SuperMarioKart-SpecialCup-GhostValley3.png", "maps/smk/original/SuperMarioKart-SpecialCup-KoopaBeach2.png", "maps/smk/original/SuperMarioKart-SpecialCup-RainbowRoad.png", "maps/smk/original/SuperMarioKart-SpecialCup-VanillaLake2.png", "maps/smk/original/SuperMarioKart-StarCup-BowserCastle3.png", "maps/smk/original/SuperMarioKart-StarCup-ChocoIsland2.png", "maps/smk/original/SuperMarioKart-StarCup-KoopaBeach1.png", "maps/smk/original/SuperMarioKart-StarCup-MarioCircuit4.png", "maps/smk/original/SuperMarioKart-StarCup-VanillaLake1.png", "maps/smk/resized/SuperMarioKart-BattleMode-BattleCourse1.png", "maps/smk/resized/SuperMarioKart-BattleMode-BattleCourse2.png", "maps/smk/resized/SuperMarioKart-BattleMode-BattleCourse3.png", "maps/smk/resized/SuperMarioKart-BattleMode-BattleCourse4.png", "maps/smk/resized/SuperMarioKart-FlowerCup-BowserCastle2.png", "maps/smk/resized/SuperMarioKart-FlowerCup-ChocoIsland1.png", "maps/smk/resized/SuperMarioKart-FlowerCup-DonutPlains2.png", "maps/smk/resized/SuperMarioKart-FlowerCup-GhostValley2.png", "maps/smk/resized/SuperMarioKart-FlowerCup-MarioCircuit3.png", "maps/smk/resized/SuperMarioKart-MushroomCup-BowserCastle1.png", "maps/smk/resized/SuperMarioKart-MushroomCup-DonutPlains1.png", "maps/smk/resized/SuperMarioKart-MushroomCup-GhostValley1.png", "maps/smk/resized/SuperMarioKart-MushroomCup-MarioCircuit1.png", "maps/smk/resized/SuperMarioKart-MushroomCup-MarioCircuit2.png", "maps/smk/resized/SuperMarioKart-SpecialCup-DonutPlains3.png", "maps/smk/resized/SuperMarioKart-SpecialCup-GhostValley3.png", "maps/smk/resized/SuperMarioKart-SpecialCup-KoopaBeach2.png", "maps/smk/resized/SuperMarioKart-SpecialCup-RainbowRoad.png", "maps/smk/resized/SuperMarioKart-SpecialCup-VanillaLake2.png", "maps/smk/resized/SuperMarioKart-StarCup-BowserCastle3.png", "maps/smk/resized/SuperMarioKart-StarCup-ChocoIsland2.png", "maps/smk/resized/SuperMarioKart-StarCup-KoopaBeach1.png", "maps/smk/resized/SuperMarioKart-StarCup-MarioCircuit4.png", "maps/smk/resized/SuperMarioKart-StarCup-VanillaLake1.png", "maps/test/height.png", "maps/test/track.png", "sprites/items/banana.png", "sprites/items/cloudkill.png", "sprites/items/colorspray.png", "sprites/items/greenshell.png", "sprites/items/handtofoot.png", "sprites/items/mushroom.png", "sprites/items/redshell.png", "sprites/items/vandegraaff.png", "sprites/karts/bowser-s1-d1.png", "sprites/karts/bowser-s1-d10.png", "sprites/karts/bowser-s1-d11.png", "sprites/karts/bowser-s1-d12.png", "sprites/karts/bowser-s1-d2.png", "sprites/karts/bowser-s1-d3.png", "sprites/karts/bowser-s1-d4.png", "sprites/karts/bowser-s1-d5.png", "sprites/karts/bowser-s1-d6.png", "sprites/karts/bowser-s1-d7.png", "sprites/karts/bowser-s1-d8.png", "sprites/karts/bowser-s1-d9.png", "sprites/karts/bowser-s2-d1.png", "sprites/karts/bowser-s2-d10.png", "sprites/karts/bowser-s2-d11.png", "sprites/karts/bowser-s2-d12.png", "sprites/karts/bowser-s2-d2.png", "sprites/karts/bowser-s2-d3.png", "sprites/karts/bowser-s2-d4.png", "sprites/karts/bowser-s2-d5.png", "sprites/karts/bowser-s2-d6.png", "sprites/karts/bowser-s2-d7.png", "sprites/karts/bowser-s2-d8.png", "sprites/karts/bowser-s2-d9.png", "sprites/karts/bowser-s3-d1.png", "sprites/karts/bowser-s3-d10.png", "sprites/karts/bowser-s3-d11.png", "sprites/karts/bowser-s3-d12.png", "sprites/karts/bowser-s3-d2.png", "sprites/karts/bowser-s3-d3.png", "sprites/karts/bowser-s3-d4.png", "sprites/karts/bowser-s3-d5.png", "sprites/karts/bowser-s3-d6.png", "sprites/karts/bowser-s3-d7.png", "sprites/karts/bowser-s3-d8.png", "sprites/karts/bowser-s3-d9.png", "sprites/karts/bowser-s4-d1.png", "sprites/karts/bowser-s4-d2.png", "sprites/karts/bowser-s4-d3.png", "sprites/karts/bowser-s4-d4.png", "sprites/karts/bowser-s4-d5.png", "sprites/karts/bowser-s4-d6.png", "sprites/karts/bowser-s4-d7.png", "sprites/karts/bowser-s4-d8.png", "sprites/karts/bowser-s5-d1.png", "sprites/karts/bowser-s5-d2.png", "sprites/karts/bowser-s5-d3.png", "sprites/karts/bowser-s5-d4.png", "sprites/karts/bowser-s5-d5.png", "sprites/karts/bowser-s5-d6.png", "sprites/karts/bowser-s5-d7.png", "sprites/karts/bowser-s5-d8.png", "sprites/karts/bowser-s6-d1.png", "sprites/karts/bowser-s6-d2.png", "sprites/karts/bowser-s6-d3.png", "sprites/karts/bowser-s6-d4.png", "sprites/karts/bowser-s6-d5.png", "sprites/karts/bowser-s6-d6.png", "sprites/karts/bowser-s7-d1.png", "sprites/karts/bowser-s7-d2.png", "sprites/karts/bowser-s7-d3.png", "sprites/karts/bowser-s7-d4.png", "sprites/karts/bowser-s7-d5.png", "sprites/karts/bowser-s8-d1.png", "sprites/karts/bowser-s8-d2.png", "sprites/karts/bowser-s8-d3.png", "sprites/karts/bowser-s8-d4.png", "sprites/karts/bowser-s9-d1.png", "sprites/karts/bowser-s9-d2.png", "sprites/karts/bowser-s9-d3.png", "sprites/karts/bowser-s9-d4.png", "sprites/karts/bowser-x1.png", "sprites/karts/bowser-x2.png", "sprites/karts/bowser-x3.png", "sprites/karts/bowser-x4.png", "sprites/karts/bowser-x5.png", "sprites/karts/bowser-x6.png", "sprites/karts/donkeykong-s1-d1.png", "sprites/karts/donkeykong-s1-d10.png", "sprites/karts/donkeykong-s1-d11.png", "sprites/karts/donkeykong-s1-d12.png", "sprites/karts/donkeykong-s1-d2.png", "sprites/karts/donkeykong-s1-d3.png", "sprites/karts/donkeykong-s1-d4.png", "sprites/karts/donkeykong-s1-d5.png", "sprites/karts/donkeykong-s1-d6.png", "sprites/karts/donkeykong-s1-d7.png", "sprites/karts/donkeykong-s1-d8.png", "sprites/karts/donkeykong-s1-d9.png", "sprites/karts/donkeykong-s2-d1.png", "sprites/karts/donkeykong-s2-d10.png", "sprites/karts/donkeykong-s2-d11.png", "sprites/karts/donkeykong-s2-d12.png", "sprites/karts/donkeykong-s2-d2.png", "sprites/karts/donkeykong-s2-d3.png", "sprites/karts/donkeykong-s2-d4.png", "sprites/karts/donkeykong-s2-d5.png", "sprites/karts/donkeykong-s2-d6.png", "sprites/karts/donkeykong-s2-d7.png", "sprites/karts/donkeykong-s2-d8.png", "sprites/karts/donkeykong-s2-d9.png", "sprites/karts/donkeykong-s3-d1.png", "sprites/karts/donkeykong-s3-d10.png", "sprites/karts/donkeykong-s3-d11.png", "sprites/karts/donkeykong-s3-d12.png", "sprites/karts/donkeykong-s3-d2.png", "sprites/karts/donkeykong-s3-d3.png", "sprites/karts/donkeykong-s3-d4.png", "sprites/karts/donkeykong-s3-d5.png", "sprites/karts/donkeykong-s3-d6.png", "sprites/karts/donkeykong-s3-d7.png", "sprites/karts/donkeykong-s3-d8.png", "sprites/karts/donkeykong-s3-d9.png", "sprites/karts/donkeykong-s4-d1.png", "sprites/karts/donkeykong-s4-d2.png", "sprites/karts/donkeykong-s4-d3.png", "sprites/karts/donkeykong-s4-d4.png", "sprites/karts/donkeykong-s4-d5.png", "sprites/karts/donkeykong-s4-d6.png", "sprites/karts/donkeykong-s4-d7.png", "sprites/karts/donkeykong-s4-d8.png", "sprites/karts/donkeykong-s5-d1.png", "sprites/karts/donkeykong-s5-d2.png", "sprites/karts/donkeykong-s5-d3.png", "sprites/karts/donkeykong-s5-d4.png", "sprites/karts/donkeykong-s5-d5.png", "sprites/karts/donkeykong-s5-d6.png", "sprites/karts/donkeykong-s5-d7.png", "sprites/karts/donkeykong-s5-d8.png", "sprites/karts/donkeykong-s6-d1.png", "sprites/karts/donkeykong-s6-d2.png", "sprites/karts/donkeykong-s6-d3.png", "sprites/karts/donkeykong-s6-d4.png", "sprites/karts/donkeykong-s6-d5.png", "sprites/karts/donkeykong-s6-d6.png", "sprites/karts/donkeykong-s7-d1.png", "sprites/karts/donkeykong-s7-d2.png", "sprites/karts/donkeykong-s7-d3.png", "sprites/karts/donkeykong-s7-d4.png", "sprites/karts/donkeykong-s7-d5.png", "sprites/karts/donkeykong-s8-d1.png", "sprites/karts/donkeykong-s8-d2.png", "sprites/karts/donkeykong-s8-d3.png", "sprites/karts/donkeykong-s8-d4.png", "sprites/karts/donkeykong-s9-d1.png", "sprites/karts/donkeykong-s9-d2.png", "sprites/karts/donkeykong-s9-d3.png", "sprites/karts/donkeykong-s9-d4.png", "sprites/karts/donkeykong-x1.png", "sprites/karts/donkeykong-x2.png", "sprites/karts/donkeykong-x3.png", "sprites/karts/donkeykong-x4.png", "sprites/karts/donkeykong-x5.png", "sprites/karts/donkeykong-x6.png", "sprites/karts/koopa-s1-d1.png", "sprites/karts/koopa-s1-d10.png", "sprites/karts/koopa-s1-d11.png", "sprites/karts/koopa-s1-d12.png", "sprites/karts/koopa-s1-d2.png", "sprites/karts/koopa-s1-d3.png", "sprites/karts/koopa-s1-d4.png", "sprites/karts/koopa-s1-d5.png", "sprites/karts/koopa-s1-d6.png", "sprites/karts/koopa-s1-d7.png", "sprites/karts/koopa-s1-d8.png", "sprites/karts/koopa-s1-d9.png", "sprites/karts/koopa-s2-d1.png", "sprites/karts/koopa-s2-d10.png", "sprites/karts/koopa-s2-d11.png", "sprites/karts/koopa-s2-d12.png", "sprites/karts/koopa-s2-d2.png", "sprites/karts/koopa-s2-d3.png", "sprites/karts/koopa-s2-d4.png", "sprites/karts/koopa-s2-d5.png", "sprites/karts/koopa-s2-d6.png", "sprites/karts/koopa-s2-d7.png", "sprites/karts/koopa-s2-d8.png", "sprites/karts/koopa-s2-d9.png", "sprites/karts/koopa-s3-d1.png", "sprites/karts/koopa-s3-d10.png", "sprites/karts/koopa-s3-d11.png", "sprites/karts/koopa-s3-d12.png", "sprites/karts/koopa-s3-d2.png", "sprites/karts/koopa-s3-d3.png", "sprites/karts/koopa-s3-d4.png", "sprites/karts/koopa-s3-d5.png", "sprites/karts/koopa-s3-d6.png", "sprites/karts/koopa-s3-d7.png", "sprites/karts/koopa-s3-d8.png", "sprites/karts/koopa-s3-d9.png", "sprites/karts/koopa-s4-d1.png", "sprites/karts/koopa-s4-d2.png", "sprites/karts/koopa-s4-d3.png", "sprites/karts/koopa-s4-d4.png", "sprites/karts/koopa-s4-d5.png", "sprites/karts/koopa-s4-d6.png", "sprites/karts/koopa-s4-d7.png", "sprites/karts/koopa-s4-d8.png", "sprites/karts/koopa-s5-d1.png", "sprites/karts/koopa-s5-d2.png", "sprites/karts/koopa-s5-d3.png", "sprites/karts/koopa-s5-d4.png", "sprites/karts/koopa-s5-d5.png", "sprites/karts/koopa-s5-d6.png", "sprites/karts/koopa-s5-d7.png", "sprites/karts/koopa-s5-d8.png", "sprites/karts/koopa-s6-d1.png", "sprites/karts/koopa-s6-d2.png", "sprites/karts/koopa-s6-d3.png", "sprites/karts/koopa-s6-d4.png", "sprites/karts/koopa-s6-d5.png", "sprites/karts/koopa-s6-d6.png", "sprites/karts/koopa-s7-d1.png", "sprites/karts/koopa-s7-d2.png", "sprites/karts/koopa-s7-d3.png", "sprites/karts/koopa-s7-d4.png", "sprites/karts/koopa-s7-d5.png", "sprites/karts/koopa-s8-d1.png", "sprites/karts/koopa-s8-d2.png", "sprites/karts/koopa-s8-d3.png", "sprites/karts/koopa-s8-d4.png", "sprites/karts/koopa-s9-d1.png", "sprites/karts/koopa-s9-d2.png", "sprites/karts/koopa-s9-d3.png", "sprites/karts/koopa-s9-d4.png", "sprites/karts/koopa-x1.png", "sprites/karts/koopa-x2.png", "sprites/karts/koopa-x3.png", "sprites/karts/koopa-x4.png", "sprites/karts/koopa-x5.png", "sprites/karts/koopa-x6.png", "sprites/karts/luigi-s1-d1.png", "sprites/karts/luigi-s1-d10.png", "sprites/karts/luigi-s1-d11.png", "sprites/karts/luigi-s1-d12.png", "sprites/karts/luigi-s1-d2.png", "sprites/karts/luigi-s1-d3.png", "sprites/karts/luigi-s1-d4.png", "sprites/karts/luigi-s1-d5.png", "sprites/karts/luigi-s1-d6.png", "sprites/karts/luigi-s1-d7.png", "sprites/karts/luigi-s1-d8.png", "sprites/karts/luigi-s1-d9.png", "sprites/karts/luigi-s2-d1.png", "sprites/karts/luigi-s2-d10.png", "sprites/karts/luigi-s2-d11.png", "sprites/karts/luigi-s2-d12.png", "sprites/karts/luigi-s2-d2.png", "sprites/karts/luigi-s2-d3.png", "sprites/karts/luigi-s2-d4.png", "sprites/karts/luigi-s2-d5.png", "sprites/karts/luigi-s2-d6.png", "sprites/karts/luigi-s2-d7.png", "sprites/karts/luigi-s2-d8.png", "sprites/karts/luigi-s2-d9.png", "sprites/karts/luigi-s3-d1.png", "sprites/karts/luigi-s3-d10.png", "sprites/karts/luigi-s3-d11.png", "sprites/karts/luigi-s3-d12.png", "sprites/karts/luigi-s3-d2.png", "sprites/karts/luigi-s3-d3.png", "sprites/karts/luigi-s3-d4.png", "sprites/karts/luigi-s3-d5.png", "sprites/karts/luigi-s3-d6.png", "sprites/karts/luigi-s3-d7.png", "sprites/karts/luigi-s3-d8.png", "sprites/karts/luigi-s3-d9.png", "sprites/karts/luigi-s4-d1.png", "sprites/karts/luigi-s4-d2.png", "sprites/karts/luigi-s4-d3.png", "sprites/karts/luigi-s4-d4.png", "sprites/karts/luigi-s4-d5.png", "sprites/karts/luigi-s4-d6.png", "sprites/karts/luigi-s4-d7.png", "sprites/karts/luigi-s4-d8.png", "sprites/karts/luigi-s5-d1.png", "sprites/karts/luigi-s5-d2.png", "sprites/karts/luigi-s5-d3.png", "sprites/karts/luigi-s5-d4.png", "sprites/karts/luigi-s5-d5.png", "sprites/karts/luigi-s5-d6.png", "sprites/karts/luigi-s5-d7.png", "sprites/karts/luigi-s5-d8.png", "sprites/karts/luigi-s6-d1.png", "sprites/karts/luigi-s6-d2.png", "sprites/karts/luigi-s6-d3.png", "sprites/karts/luigi-s6-d4.png", "sprites/karts/luigi-s6-d5.png", "sprites/karts/luigi-s6-d6.png", "sprites/karts/luigi-s7-d1.png", "sprites/karts/luigi-s7-d2.png", "sprites/karts/luigi-s7-d3.png", "sprites/karts/luigi-s7-d4.png", "sprites/karts/luigi-s7-d5.png", "sprites/karts/luigi-s8-d1.png", "sprites/karts/luigi-s8-d2.png", "sprites/karts/luigi-s8-d3.png", "sprites/karts/luigi-s8-d4.png", "sprites/karts/luigi-s9-d1.png", "sprites/karts/luigi-s9-d2.png", "sprites/karts/luigi-s9-d3.png", "sprites/karts/luigi-s9-d4.png", "sprites/karts/luigi-x1.png", "sprites/karts/luigi-x2.png", "sprites/karts/luigi-x3.png", "sprites/karts/luigi-x4.png", "sprites/karts/luigi-x5.png", "sprites/karts/luigi-x6.png", "sprites/karts/mario-s1-d1.png", "sprites/karts/mario-s1-d10.png", "sprites/karts/mario-s1-d11.png", "sprites/karts/mario-s1-d12.png", "sprites/karts/mario-s1-d2.png", "sprites/karts/mario-s1-d3.png", "sprites/karts/mario-s1-d4.png", "sprites/karts/mario-s1-d5.png", "sprites/karts/mario-s1-d6.png", "sprites/karts/mario-s1-d7.png", "sprites/karts/mario-s1-d8.png", "sprites/karts/mario-s1-d9.png", "sprites/karts/mario-s2-d1.png", "sprites/karts/mario-s2-d10.png", "sprites/karts/mario-s2-d11.png", "sprites/karts/mario-s2-d12.png", "sprites/karts/mario-s2-d2.png", "sprites/karts/mario-s2-d3.png", "sprites/karts/mario-s2-d4.png", "sprites/karts/mario-s2-d5.png", "sprites/karts/mario-s2-d6.png", "sprites/karts/mario-s2-d7.png", "sprites/karts/mario-s2-d8.png", "sprites/karts/mario-s2-d9.png", "sprites/karts/mario-s3-d1.png", "sprites/karts/mario-s3-d10.png", "sprites/karts/mario-s3-d11.png", "sprites/karts/mario-s3-d12.png", "sprites/karts/mario-s3-d2.png", "sprites/karts/mario-s3-d3.png", "sprites/karts/mario-s3-d4.png", "sprites/karts/mario-s3-d5.png", "sprites/karts/mario-s3-d6.png", "sprites/karts/mario-s3-d7.png", "sprites/karts/mario-s3-d8.png", "sprites/karts/mario-s3-d9.png", "sprites/karts/mario-s4-d1.png", "sprites/karts/mario-s4-d2.png", "sprites/karts/mario-s4-d3.png", "sprites/karts/mario-s4-d4.png", "sprites/karts/mario-s4-d5.png", "sprites/karts/mario-s4-d6.png", "sprites/karts/mario-s4-d7.png", "sprites/karts/mario-s4-d8.png", "sprites/karts/mario-s5-d1.png", "sprites/karts/mario-s5-d2.png", "sprites/karts/mario-s5-d3.png", "sprites/karts/mario-s5-d4.png", "sprites/karts/mario-s5-d5.png", "sprites/karts/mario-s5-d6.png", "sprites/karts/mario-s5-d7.png", "sprites/karts/mario-s5-d8.png", "sprites/karts/mario-s6-d1.png", "sprites/karts/mario-s6-d2.png", "sprites/karts/mario-s6-d3.png", "sprites/karts/mario-s6-d4.png", "sprites/karts/mario-s6-d5.png", "sprites/karts/mario-s6-d6.png", "sprites/karts/mario-s7-d1.png", "sprites/karts/mario-s7-d2.png", "sprites/karts/mario-s7-d3.png", "sprites/karts/mario-s7-d4.png", "sprites/karts/mario-s7-d5.png", "sprites/karts/mario-s8-d1.png", "sprites/karts/mario-s8-d2.png", "sprites/karts/mario-s8-d3.png", "sprites/karts/mario-s8-d4.png", "sprites/karts/mario-s9-d1.png", "sprites/karts/mario-s9-d2.png", "sprites/karts/mario-s9-d3.png", "sprites/karts/mario-s9-d4.png", "sprites/karts/mario-x1.png", "sprites/karts/mario-x2.png", "sprites/karts/mario-x3.png", "sprites/karts/mario-x4.png", "sprites/karts/mario-x5.png", "sprites/karts/mario-x6.png", "sprites/karts/princess-s1-d1.png", "sprites/karts/princess-s1-d10.png", "sprites/karts/princess-s1-d11.png", "sprites/karts/princess-s1-d12.png", "sprites/karts/princess-s1-d2.png", "sprites/karts/princess-s1-d3.png", "sprites/karts/princess-s1-d4.png", "sprites/karts/princess-s1-d5.png", "sprites/karts/princess-s1-d6.png", "sprites/karts/princess-s1-d7.png", "sprites/karts/princess-s1-d8.png", "sprites/karts/princess-s1-d9.png", "sprites/karts/princess-s2-d1.png", "sprites/karts/princess-s2-d10.png", "sprites/karts/princess-s2-d11.png", "sprites/karts/princess-s2-d12.png", "sprites/karts/princess-s2-d2.png", "sprites/karts/princess-s2-d3.png", "sprites/karts/princess-s2-d4.png", "sprites/karts/princess-s2-d5.png", "sprites/karts/princess-s2-d6.png", "sprites/karts/princess-s2-d7.png", "sprites/karts/princess-s2-d8.png", "sprites/karts/princess-s2-d9.png", "sprites/karts/princess-s3-d1.png", "sprites/karts/princess-s3-d10.png", "sprites/karts/princess-s3-d11.png", "sprites/karts/princess-s3-d12.png", "sprites/karts/princess-s3-d2.png", "sprites/karts/princess-s3-d3.png", "sprites/karts/princess-s3-d4.png", "sprites/karts/princess-s3-d5.png", "sprites/karts/princess-s3-d6.png", "sprites/karts/princess-s3-d7.png", "sprites/karts/princess-s3-d8.png", "sprites/karts/princess-s3-d9.png", "sprites/karts/princess-s4-d1.png", "sprites/karts/princess-s4-d2.png", "sprites/karts/princess-s4-d3.png", "sprites/karts/princess-s4-d4.png", "sprites/karts/princess-s4-d5.png", "sprites/karts/princess-s4-d6.png", "sprites/karts/princess-s4-d7.png", "sprites/karts/princess-s4-d8.png", "sprites/karts/princess-s5-d1.png", "sprites/karts/princess-s5-d2.png", "sprites/karts/princess-s5-d3.png", "sprites/karts/princess-s5-d4.png", "sprites/karts/princess-s5-d5.png", "sprites/karts/princess-s5-d6.png", "sprites/karts/princess-s5-d7.png", "sprites/karts/princess-s5-d8.png", "sprites/karts/princess-s6-d1.png", "sprites/karts/princess-s6-d2.png", "sprites/karts/princess-s6-d3.png", "sprites/karts/princess-s6-d4.png", "sprites/karts/princess-s6-d5.png", "sprites/karts/princess-s6-d6.png", "sprites/karts/princess-s7-d1.png", "sprites/karts/princess-s7-d2.png", "sprites/karts/princess-s7-d3.png", "sprites/karts/princess-s7-d4.png", "sprites/karts/princess-s7-d5.png", "sprites/karts/princess-s8-d1.png", "sprites/karts/princess-s8-d2.png", "sprites/karts/princess-s8-d3.png", "sprites/karts/princess-s8-d4.png", "sprites/karts/princess-s9-d1.png", "sprites/karts/princess-s9-d2.png", "sprites/karts/princess-s9-d3.png", "sprites/karts/princess-s9-d4.png", "sprites/karts/princess-x1.png", "sprites/karts/princess-x2.png", "sprites/karts/princess-x3.png", "sprites/karts/princess-x4.png", "sprites/karts/princess-x5.png", "sprites/karts/princess-x6.png", "sprites/karts/toad-s1-d1.png", "sprites/karts/toad-s1-d10.png", "sprites/karts/toad-s1-d11.png", "sprites/karts/toad-s1-d12.png", "sprites/karts/toad-s1-d2.png", "sprites/karts/toad-s1-d3.png", "sprites/karts/toad-s1-d4.png", "sprites/karts/toad-s1-d5.png", "sprites/karts/toad-s1-d6.png", "sprites/karts/toad-s1-d7.png", "sprites/karts/toad-s1-d8.png", "sprites/karts/toad-s1-d9.png", "sprites/karts/toad-s2-d1.png", "sprites/karts/toad-s2-d10.png", "sprites/karts/toad-s2-d11.png", "sprites/karts/toad-s2-d12.png", "sprites/karts/toad-s2-d2.png", "sprites/karts/toad-s2-d3.png", "sprites/karts/toad-s2-d4.png", "sprites/karts/toad-s2-d5.png", "sprites/karts/toad-s2-d6.png", "sprites/karts/toad-s2-d7.png", "sprites/karts/toad-s2-d8.png", "sprites/karts/toad-s2-d9.png", "sprites/karts/toad-s3-d1.png", "sprites/karts/toad-s3-d10.png", "sprites/karts/toad-s3-d11.png", "sprites/karts/toad-s3-d12.png", "sprites/karts/toad-s3-d2.png", "sprites/karts/toad-s3-d3.png", "sprites/karts/toad-s3-d4.png", "sprites/karts/toad-s3-d5.png", "sprites/karts/toad-s3-d6.png", "sprites/karts/toad-s3-d7.png", "sprites/karts/toad-s3-d8.png", "sprites/karts/toad-s3-d9.png", "sprites/karts/toad-s4-d1.png", "sprites/karts/toad-s4-d2.png", "sprites/karts/toad-s4-d3.png", "sprites/karts/toad-s4-d4.png", "sprites/karts/toad-s4-d5.png", "sprites/karts/toad-s4-d6.png", "sprites/karts/toad-s4-d7.png", "sprites/karts/toad-s4-d8.png", "sprites/karts/toad-s5-d1.png", "sprites/karts/toad-s5-d2.png", "sprites/karts/toad-s5-d3.png", "sprites/karts/toad-s5-d4.png", "sprites/karts/toad-s5-d5.png", "sprites/karts/toad-s5-d6.png", "sprites/karts/toad-s5-d7.png", "sprites/karts/toad-s5-d8.png", "sprites/karts/toad-s6-d1.png", "sprites/karts/toad-s6-d2.png", "sprites/karts/toad-s6-d3.png", "sprites/karts/toad-s6-d4.png", "sprites/karts/toad-s6-d5.png", "sprites/karts/toad-s6-d6.png", "sprites/karts/toad-s7-d1.png", "sprites/karts/toad-s7-d2.png", "sprites/karts/toad-s7-d3.png", "sprites/karts/toad-s7-d4.png", "sprites/karts/toad-s7-d5.png", "sprites/karts/toad-s8-d1.png", "sprites/karts/toad-s8-d2.png", "sprites/karts/toad-s8-d3.png", "sprites/karts/toad-s8-d4.png", "sprites/karts/toad-s9-d1.png", "sprites/karts/toad-s9-d2.png", "sprites/karts/toad-s9-d3.png", "sprites/karts/toad-s9-d4.png", "sprites/karts/toad-x1.png", "sprites/karts/toad-x2.png", "sprites/karts/toad-x3.png", "sprites/karts/toad-x4.png", "sprites/karts/toad-x5.png", "sprites/karts/toad-x6.png", "sprites/karts/yoshi-s1-d1.png", "sprites/karts/yoshi-s1-d10.png", "sprites/karts/yoshi-s1-d11.png", "sprites/karts/yoshi-s1-d12.png", "sprites/karts/yoshi-s1-d2.png", "sprites/karts/yoshi-s1-d3.png", "sprites/karts/yoshi-s1-d4.png", "sprites/karts/yoshi-s1-d5.png", "sprites/karts/yoshi-s1-d6.png", "sprites/karts/yoshi-s1-d7.png", "sprites/karts/yoshi-s1-d8.png", "sprites/karts/yoshi-s1-d9.png", "sprites/karts/yoshi-s2-d1.png", "sprites/karts/yoshi-s2-d10.png", "sprites/karts/yoshi-s2-d11.png", "sprites/karts/yoshi-s2-d12.png", "sprites/karts/yoshi-s2-d2.png", "sprites/karts/yoshi-s2-d3.png", "sprites/karts/yoshi-s2-d4.png", "sprites/karts/yoshi-s2-d5.png", "sprites/karts/yoshi-s2-d6.png", "sprites/karts/yoshi-s2-d7.png", "sprites/karts/yoshi-s2-d8.png", "sprites/karts/yoshi-s2-d9.png", "sprites/karts/yoshi-s3-d1.png", "sprites/karts/yoshi-s3-d10.png", "sprites/karts/yoshi-s3-d11.png", "sprites/karts/yoshi-s3-d12.png", "sprites/karts/yoshi-s3-d2.png", "sprites/karts/yoshi-s3-d3.png", "sprites/karts/yoshi-s3-d4.png", "sprites/karts/yoshi-s3-d5.png", "sprites/karts/yoshi-s3-d6.png", "sprites/karts/yoshi-s3-d7.png", "sprites/karts/yoshi-s3-d8.png", "sprites/karts/yoshi-s3-d9.png", "sprites/karts/yoshi-s4-d1.png", "sprites/karts/yoshi-s4-d2.png", "sprites/karts/yoshi-s4-d3.png", "sprites/karts/yoshi-s4-d4.png", "sprites/karts/yoshi-s4-d5.png", "sprites/karts/yoshi-s4-d6.png", "sprites/karts/yoshi-s4-d7.png", "sprites/karts/yoshi-s4-d8.png", "sprites/karts/yoshi-s5-d1.png", "sprites/karts/yoshi-s5-d2.png", "sprites/karts/yoshi-s5-d3.png", "sprites/karts/yoshi-s5-d4.png", "sprites/karts/yoshi-s5-d5.png", "sprites/karts/yoshi-s5-d6.png", "sprites/karts/yoshi-s5-d7.png", "sprites/karts/yoshi-s5-d8.png", "sprites/karts/yoshi-s6-d1.png", "sprites/karts/yoshi-s6-d2.png", "sprites/karts/yoshi-s6-d3.png", "sprites/karts/yoshi-s6-d4.png", "sprites/karts/yoshi-s6-d5.png", "sprites/karts/yoshi-s6-d6.png", "sprites/karts/yoshi-s7-d1.png", "sprites/karts/yoshi-s7-d2.png", "sprites/karts/yoshi-s7-d3.png", "sprites/karts/yoshi-s7-d4.png", "sprites/karts/yoshi-s7-d5.png", "sprites/karts/yoshi-s8-d1.png", "sprites/karts/yoshi-s8-d2.png", "sprites/karts/yoshi-s8-d3.png", "sprites/karts/yoshi-s8-d4.png", "sprites/karts/yoshi-s9-d1.png", "sprites/karts/yoshi-s9-d2.png", "sprites/karts/yoshi-s9-d3.png", "sprites/karts/yoshi-s9-d4.png", "sprites/karts/yoshi-x1.png", "sprites/karts/yoshi-x2.png", "sprites/karts/yoshi-x3.png", "sprites/karts/yoshi-x4.png", "sprites/karts/yoshi-x5.png", "sprites/karts/yoshi-x6.png", "sprites/lakitu.png", "sprites/objects/colorspray.png", "sprites/objects/item.png", "sprites/outline.png", "templates/items.png", "templates/supermariokart_characters_sheet.png", "textures/bluerock.png", "textures/boost.png", "textures/dirt.png", "textures/font.png", "textures/grass.png", "textures/grid.png", "textures/sky.png", "textures/startingline.png"]},
	['zeta-lua'] : {branch:'master', pics:["base/res/font.png", "docs/images/pic-editor-1.png", "docs/images/pic-editor-2.png", "docs/images/pic1.png", "docs/images/pic2.png", "docs/images/pic3.png", "docs/images/pic4.png", "docs/images/pic5.png", "docs/images/pic6.png", "docs/images/pic7.png", "docs/images/pic8.png", "mario/maps/fight/background.png", "mario/maps/fight/room.png", "mario/maps/fight/tile-bg.png", "mario/maps/fight/tile-fg.png", "mario/maps/fight/tile.png", "mario/maps/mine/background.png", "mario/maps/mine/room.png", "mario/maps/mine/tile-bg.png", "mario/maps/mine/tile-fg.png", "mario/maps/mine/tile.png", "neko/bgtexpack.png", "neko/maps/start/background.png", "neko/maps/start/room.png", "neko/maps/start/tile-bg.png", "neko/maps/start/tile-fg.png", "neko/maps/start/tile.png", "neko/sprites/berry_green/stand1.png", "neko/sprites/berry_green/stand2.png", "neko/sprites/berry_green/stand3.png", "neko/sprites/berry_pink/stand1.png", "neko/sprites/berry_pink/stand2.png", "neko/sprites/berry_pink/stand3.png", "neko/sprites/berry_red/stand1.png", "neko/sprites/berry_red/stand2.png", "neko/sprites/berry_red/stand3.png", "neko/sprites/mushroom/stand.png", "neko/sprites/mushroom/step.png", "neko/sprites/neko/climb1.png", "neko/sprites/neko/climb2.png", "neko/sprites/neko/die.png", "neko/sprites/neko/fall.png", "neko/sprites/neko/jump.png", "neko/sprites/neko/lookup.png", "neko/sprites/neko/stand.png", "neko/sprites/neko/step.png", "neko/sprites/neko/swim.png", "neko/sprites/neko/swim2.png", "neko/sprites/neko/swim3.png", "neko/sprites/rabbit/attack.png", "neko/sprites/rabbit/stand.png", "neko/texpack.png", "zeta/dragonbones armatures/Bat/library/body.png", "zeta/dragonbones armatures/Bat/library/wing.png", "zeta/dragonbones armatures/BossGeemer/library/body.png", "zeta/dragonbones armatures/BossGeemer/library/eye.png", "zeta/dragonbones armatures/BossGeemer/library/iris.png", "zeta/dragonbones armatures/Hero/library/body.png", "zeta/dragonbones armatures/Hero/library/head.png", "zeta/dragonbones armatures/Hero/library/left lower arm.png", "zeta/dragonbones armatures/Hero/library/left lower leg.png", "zeta/dragonbones armatures/Hero/library/left upper arm.png", "zeta/dragonbones armatures/Hero/library/left upper leg.png", "zeta/dragonbones armatures/Hero/library/right lower arm.png", "zeta/dragonbones armatures/Hero/library/right lower leg.png", "zeta/dragonbones armatures/Hero/library/right upper arm.png", "zeta/dragonbones armatures/Hero/library/right upper leg.png", "zeta/dragonbones armatures/Teeth/library/body.png", "zeta/dragonbones armatures/Teeth/library/jaw.png", "zeta/maps/reboot/background.png", "zeta/maps/reboot/room.png", "zeta/maps/reboot/texpack.png", "zeta/maps/reboot/tile-bg.png", "zeta/maps/reboot/tile-fg.png", "zeta/maps/reboot/tile.png", "zeta/maps/start/background.png", "zeta/maps/start/room.png", "zeta/maps/start/tile-bg.png", "zeta/maps/start/tile-fg.png", "zeta/maps/start/tile.png", "zeta/sprites/attack-bonus/stand1.png", "zeta/sprites/attack-bonus/stand2.png", "zeta/sprites/attack-bonus/stand3.png", "zeta/sprites/barrier/stand1.png", "zeta/sprites/barrier/stand2.png", "zeta/sprites/barrier/stand3.png", "zeta/sprites/barrier/stand4.png", "zeta/sprites/barrier/stand5.png", "zeta/sprites/bat/stand_0.png", "zeta/sprites/bat/stand_1.png", "zeta/sprites/bat/stand_10.png", "zeta/sprites/bat/stand_11.png", "zeta/sprites/bat/stand_12.png", "zeta/sprites/bat/stand_13.png", "zeta/sprites/bat/stand_14.png", "zeta/sprites/bat/stand_15.png", "zeta/sprites/bat/stand_2.png", "zeta/sprites/bat/stand_3.png", "zeta/sprites/bat/stand_4.png", "zeta/sprites/bat/stand_5.png", "zeta/sprites/bat/stand_6.png", "zeta/sprites/bat/stand_7.png", "zeta/sprites/bat/stand_8.png", "zeta/sprites/bat/stand_9.png", "zeta/sprites/blaster-shot/stand.png", "zeta/sprites/blaster/stand.png", "zeta/sprites/boss-geemer/stand.png", "zeta/sprites/breakblock/stand1.png", "zeta/sprites/breakblock/stand2.png", "zeta/sprites/breakblock/stand3.png", "zeta/sprites/breakblock/stand4.png", "zeta/sprites/breakblock/stand5.png", "zeta/sprites/cells/stand.png", "zeta/sprites/cells/stand1.png", "zeta/sprites/cells/stand2.png", "zeta/sprites/cells/stand3.png", "zeta/sprites/cells/stand4.png", "zeta/sprites/cells/stand5.png", "zeta/sprites/cells/stand6.png", "zeta/sprites/cells/stand7.png", "zeta/sprites/cells/stand8.png", "zeta/sprites/crystal/stand1.png", "zeta/sprites/crystal/stand10.png", "zeta/sprites/crystal/stand11.png", "zeta/sprites/crystal/stand12.png", "zeta/sprites/crystal/stand13.png", "zeta/sprites/crystal/stand14.png", "zeta/sprites/crystal/stand15.png", "zeta/sprites/crystal/stand2.png", "zeta/sprites/crystal/stand3.png", "zeta/sprites/crystal/stand4.png", "zeta/sprites/crystal/stand5.png", "zeta/sprites/crystal/stand6.png", "zeta/sprites/crystal/stand7.png", "zeta/sprites/crystal/stand8.png", "zeta/sprites/crystal/stand9.png", "zeta/sprites/defense-bonus/stand1.png", "zeta/sprites/defense-bonus/stand2.png", "zeta/sprites/defense-bonus/stand3.png", "zeta/sprites/door/stand.png", "zeta/sprites/door/unlock.png", "zeta/sprites/energyrefill/spark1.png", "zeta/sprites/energyrefill/spark10.png", "zeta/sprites/energyrefill/spark2.png", "zeta/sprites/energyrefill/spark3.png", "zeta/sprites/energyrefill/spark4.png", "zeta/sprites/energyrefill/spark5.png", "zeta/sprites/energyrefill/spark6.png", "zeta/sprites/energyrefill/spark7.png", "zeta/sprites/energyrefill/spark8.png", "zeta/sprites/energyrefill/spark9.png", "zeta/sprites/energyrefill/stand.png", "zeta/sprites/geemer/hiding.png", "zeta/sprites/geemer/stand.png", "zeta/sprites/grenade/stand.png", "zeta/sprites/heart/stand1.png", "zeta/sprites/heart/stand2.png", "zeta/sprites/heart/stand3.png", "zeta/sprites/hero/climb_0.png", "zeta/sprites/hero/climb_1.png", "zeta/sprites/hero/climb_10.png", "zeta/sprites/hero/climb_11.png", "zeta/sprites/hero/climb_12.png", "zeta/sprites/hero/climb_13.png", "zeta/sprites/hero/climb_14.png", "zeta/sprites/hero/climb_15.png", "zeta/sprites/hero/climb_16.png", "zeta/sprites/hero/climb_2.png", "zeta/sprites/hero/climb_3.png", "zeta/sprites/hero/climb_4.png", "zeta/sprites/hero/climb_5.png", "zeta/sprites/hero/climb_6.png", "zeta/sprites/hero/climb_7.png", "zeta/sprites/hero/climb_8.png", "zeta/sprites/hero/climb_9.png", "zeta/sprites/hero/climb_to_crawl_0.png", "zeta/sprites/hero/climb_to_crawl_1.png", "zeta/sprites/hero/climb_to_crawl_2.png", "zeta/sprites/hero/climb_to_crawl_3.png", "zeta/sprites/hero/climb_to_crawl_4.png", "zeta/sprites/hero/climb_to_crawl_5.png", "zeta/sprites/hero/climb_to_crawl_6.png", "zeta/sprites/hero/climb_to_crawl_7.png", "zeta/sprites/hero/climb_to_crawl_8.png", "zeta/sprites/hero/crawl_0.png", "zeta/sprites/hero/crawl_1.png", "zeta/sprites/hero/crawl_10.png", "zeta/sprites/hero/crawl_11.png", "zeta/sprites/hero/crawl_12.png", "zeta/sprites/hero/crawl_13.png", "zeta/sprites/hero/crawl_14.png", "zeta/sprites/hero/crawl_15.png", "zeta/sprites/hero/crawl_16.png", "zeta/sprites/hero/crawl_2.png", "zeta/sprites/hero/crawl_3.png", "zeta/sprites/hero/crawl_4.png", "zeta/sprites/hero/crawl_5.png", "zeta/sprites/hero/crawl_6.png", "zeta/sprites/hero/crawl_7.png", "zeta/sprites/hero/crawl_8.png", "zeta/sprites/hero/crawl_9.png", "zeta/sprites/hero/die.png", "zeta/sprites/hero/duck-carry.png", "zeta/sprites/hero/duck.png", "zeta/sprites/hero/fall_0.png", "zeta/sprites/hero/jump-arms.png", "zeta/sprites/hero/jump_0.png", "zeta/sprites/hero/kick.png", "zeta/sprites/hero/lookup_0.png", "zeta/sprites/hero/lookup_carry_0.png", "zeta/sprites/hero/run_0.png", "zeta/sprites/hero/run_1.png", "zeta/sprites/hero/run_10.png", "zeta/sprites/hero/run_11.png", "zeta/sprites/hero/run_12.png", "zeta/sprites/hero/run_13.png", "zeta/sprites/hero/run_14.png", "zeta/sprites/hero/run_15.png", "zeta/sprites/hero/run_2.png", "zeta/sprites/hero/run_3.png", "zeta/sprites/hero/run_4.png", "zeta/sprites/hero/run_5.png", "zeta/sprites/hero/run_6.png", "zeta/sprites/hero/run_7.png", "zeta/sprites/hero/run_8.png", "zeta/sprites/hero/run_9.png", "zeta/sprites/hero/run_carry_0.png", "zeta/sprites/hero/run_carry_1.png", "zeta/sprites/hero/run_carry_10.png", "zeta/sprites/hero/run_carry_11.png", "zeta/sprites/hero/run_carry_12.png", "zeta/sprites/hero/run_carry_13.png", "zeta/sprites/hero/run_carry_14.png", "zeta/sprites/hero/run_carry_15.png", "zeta/sprites/hero/run_carry_2.png", "zeta/sprites/hero/run_carry_3.png", "zeta/sprites/hero/run_carry_4.png", "zeta/sprites/hero/run_carry_5.png", "zeta/sprites/hero/run_carry_6.png", "zeta/sprites/hero/run_carry_7.png", "zeta/sprites/hero/run_carry_8.png", "zeta/sprites/hero/run_carry_9.png", "zeta/sprites/hero/skid.png", "zeta/sprites/hero/slide.png", "zeta/sprites/hero/stand-arms.png", "zeta/sprites/hero/stand_0.png", "zeta/sprites/hero/stand_carry_0.png", "zeta/sprites/hero/step1-arms.png", "zeta/sprites/hero/step2-arms.png", "zeta/sprites/keycard/stand.png", "zeta/sprites/missile/stand.png", "zeta/sprites/plasma-shot/stand.png", "zeta/sprites/puff/stand.png", "zeta/sprites/redgeemer/stand.png", "zeta/sprites/savepoint/stand1.png", "zeta/sprites/savepoint/stand2.png", "zeta/sprites/sawblade/stand.png", "zeta/sprites/speed-booster/stand.png", "zeta/sprites/teeth/chomp_0.png", "zeta/sprites/teeth/chomp_1.png", "zeta/sprites/teeth/chomp_10.png", "zeta/sprites/teeth/chomp_11.png", "zeta/sprites/teeth/chomp_2.png", "zeta/sprites/teeth/chomp_3.png", "zeta/sprites/teeth/chomp_4.png", "zeta/sprites/teeth/chomp_5.png", "zeta/sprites/teeth/chomp_6.png", "zeta/sprites/teeth/chomp_7.png", "zeta/sprites/teeth/chomp_8.png", "zeta/sprites/teeth/chomp_9.png", "zeta/sprites/teeth/stand_0.png", "zeta/sprites/terminal/stand.png", "zeta/sprites/turret-base/stand.png", "zeta/sprites/turret-body/idle.png", "zeta/sprites/turret-body/stand.png", "zeta/sprites/walljump/stand.png", "zeta/sprites/whitegeemer/stand.png", "zeta/texpack.png"]},
	['geographic-charts-lua'] : {branch:'master', pics:["earth-color.png"]},
	['seashell-lua'] : {branch:'master', pics:["pics/pic11.png", "cloudy/bluecloud_bk.jpg", "cloudy/bluecloud_dn.jpg", "cloudy/bluecloud_ft.jpg", "cloudy/bluecloud_lf.jpg", "cloudy/bluecloud_rt.jpg", "cloudy/bluecloud_up.jpg", "cloudy/browncloud_bk.jpg", "cloudy/browncloud_dn.jpg", "cloudy/browncloud_ft.jpg", "cloudy/browncloud_lf.jpg", "cloudy/browncloud_rt.jpg", "cloudy/browncloud_up.jpg", "cloudy/graycloud_bk.jpg", "cloudy/graycloud_dn.jpg", "cloudy/graycloud_ft.jpg", "cloudy/graycloud_lf.jpg", "cloudy/graycloud_rt.jpg", "cloudy/graycloud_up.jpg", "cloudy/yellowcloud_bk.jpg", "cloudy/yellowcloud_dn.jpg", "cloudy/yellowcloud_ft.jpg", "cloudy/yellowcloud_lf.jpg", "cloudy/yellowcloud_rt.jpg", "cloudy/yellowcloud_up.jpg", "pics/pic1.png", "pics/pic10.png", "pics/pic12.png", "pics/pic2.png", "pics/pic3.png", "pics/pic4.png", "pics/pic5.png", "pics/pic6.png", "pics/pic7.png", "pics/pic8.png", "pics/pic9.png"]},
	['tetris-attack-lua'] : {branch:'master', pics:["cursor.png", "diamond.png", "heart.png", "square.png", "star.png", "triangle.png"]},
	['following-fdtd-lessons'] : {branch:'master', pics:["out.png"]},
	['browser3d-lua'] : {branch:'master', pics:["pages/cube.png"]},
	['surface-from-connection-lua'] : {branch:'master', pics:["docs/sphere surface - theta=.5 pi phi=pi.png", "docs/conn numeric vs analytic.png", "docs/polar anholonomic - r=1, theta=0.png", "docs/polar anholonomic - r=1, theta=pi.png", "docs/polar anholonomic - r=2, theta=0.png", "docs/polar-correct.png", "docs/polar-incorrect-r=.5.png", "docs/polar-incorrect-r=2.png", "docs/sphere - r=1, theta=.5 pi, phi=0.png", "docs/sphere - r=2, theta=.5 pi, phi=0.png", "docs/sphere surface - theta=.5 pi phi=0.png", "docs/sphere surface - theta=.5 pi phi=2 pi.png"]},
	['lua-metric'] : {branch:'master', pics:["images/geodesic.png", "images/gaussian.png", "images/ricci 1.png", "images/ricci 2.png"]},
	['SphericalHarmonicGraphs'] : {branch:'master', pics:["images/image1.png"]},
	['sand-attack'] : {branch:'master', pics:["tex/splash.png", "tex/youlose.png"]},
	['pong-lua'] : {branch:'master', pics:["ball.png", "block.png", "player.png"]},
	['lambda-cdm-lua'] : {branch:'master', pics:["screenshot.png"]},
	['EinsteinFieldEquationSolution'] : {branch:'master', pics:["images/pic1.png", "images/earth profile d_dr mass.png", "images/earth profile gravity differences.png", "images/earth profile gravity models.png", "images/earth profile mass.png", "images/gravity differences.png", "images/gravity models.png", "images/kerr fast rotation vs. kerr rotation.png", "images/kerr with vs. without rotation.png", "images/schwarzschild potential 2.png", "images/schwarzschild potential.png", "images/schwarzschild_eos.png"]},
	['efesoln-cl-lua'] : {branch:'master', pics:["images/pic.png"]},
	['kart-js'] : {branch:'master', pics:["maps/map1/height.png", "maps/map1/track.png"]},
	['ad-verse'] : {branch:'master', pics:["adtex-staging/your_ad_here-64x64.png", "logo-32x32.png", "preview.jpg", "preview.png"]},
	['hydrodynamics-js'] : {branch:'master', pics:["background.png", "finite_volume_superbee_limited_sod_shock_tube_test_2d_2048x2048.png", "menu.png", "pause.png", "play.png"]},
	['wavefunction'] : {branch:'master', pics:["menu.png"]},
	['4d-renderer-js'] : {branch:'master', pics:["images/screenshot.png", "menu.png", "tex/bricks.png", "tex/player.png", "thumbs/screenshot.png"]},
	['universe'] : {branch:'master', pics:["close.png", "download.png", "galaxy-original.png", "galaxy.png", "images/screenshot-sdss3-dr12.jpg", "images/screenshot.jpg", "thumbs/screenshot.jpg"]},
	['octonion-multiplication-table-js'] : {branch:'master', pics:["images/screenshot.png", "thumbs/screenshot.png"]},
	['thomas-precession'] : {branch:'master', pics:["BlueMarble.png"]},
	['metric'] : {branch:'master', pics:["menu.png"]},
	['time-dilation'] : {branch:'master', pics:["menu.png"]},
	['socialbrowsing'] : {branch:'master', pics:["cursor.png"]},
	['solarsystem'] : {branch:'master', pics:["colorForTemp.png", "ffwd.png", "images/screenshot-2.png", "images/screenshot.png", "menu.png", "play.png", "reset.png", "reverse.png", "rewind.png", "stop.png", "textures/callisto.png", "textures/charon.png", "textures/deimos.png", "textures/dione.png", "textures/earth.png", "textures/enceladus.png", "textures/europa.png", "textures/ganymede.png", "textures/iapetus.png", "textures/io.png", "textures/jupiter-rings-color.png", "textures/jupiter.png", "textures/mars.png", "textures/mercury.png", "textures/milkyway.png", "textures/mimas.png", "textures/moon.png", "textures/neptune.png", "textures/phobos.png", "textures/phoebe.png", "textures/pluto.png", "textures/rhea.png", "textures/saturn-rings-back-scattered.png", "textures/saturn-rings-color.png", "textures/saturn-rings-forward-scattered.png", "textures/saturn-rings-transparency.png", "textures/saturn-rings-unlit-side.png", "textures/saturn.png", "textures/sky-visible-cube-xn-1024.png", "textures/sky-visible-cube-xn-256.png", "textures/sky-visible-cube-xn-512.png", "textures/sky-visible-cube-xp-1024.png", "textures/sky-visible-cube-xp-256.png", "textures/sky-visible-cube-xp-512.png", "textures/sky-visible-cube-yn-1024.png", "textures/sky-visible-cube-yn-256.png", "textures/sky-visible-cube-yn-512.png", "textures/sky-visible-cube-yp-1024.png", "textures/sky-visible-cube-yp-256.png", "textures/sky-visible-cube-yp-512.png", "textures/sky-visible-cube-zn-1024.png", "textures/sky-visible-cube-zn-256.png", "textures/sky-visible-cube-zn-512.png", "textures/sky-visible-cube-zp-1024.png", "textures/sky-visible-cube-zp-256.png", "textures/sky-visible-cube-zp-512.png", "textures/sun.png", "textures/tethys.png", "textures/titan.png", "textures/uranus.png", "textures/venus-without-clouds.png", "textures/venus.png", "themes/base/images/ui-bg_flat_0_aaaaaa_40x100.png", "themes/base/images/ui-bg_flat_75_ffffff_40x100.png", "themes/base/images/ui-bg_glass_55_fbf9ee_1x400.png", "themes/base/images/ui-bg_glass_65_ffffff_1x400.png", "themes/base/images/ui-bg_glass_75_dadada_1x400.png", "themes/base/images/ui-bg_glass_75_e6e6e6_1x400.png", "themes/base/images/ui-bg_glass_95_fef1ec_1x400.png", "themes/base/images/ui-bg_highlight-soft_75_cccccc_1x100.png", "themes/base/images/ui-icons_222222_256x240.png", "themes/base/images/ui-icons_2e83ff_256x240.png", "themes/base/images/ui-icons_454545_256x240.png", "themes/base/images/ui-icons_888888_256x240.png", "themes/base/images/ui-icons_cd0a0a_256x240.png", "themes/base/minified/images/ui-bg_flat_0_aaaaaa_40x100.png", "themes/base/minified/images/ui-bg_flat_75_ffffff_40x100.png", "themes/base/minified/images/ui-bg_glass_55_fbf9ee_1x400.png", "themes/base/minified/images/ui-bg_glass_65_ffffff_1x400.png", "themes/base/minified/images/ui-bg_glass_75_dadada_1x400.png", "themes/base/minified/images/ui-bg_glass_75_e6e6e6_1x400.png", "themes/base/minified/images/ui-bg_glass_95_fef1ec_1x400.png", "themes/base/minified/images/ui-bg_highlight-soft_75_cccccc_1x100.png", "themes/base/minified/images/ui-icons_222222_256x240.png", "themes/base/minified/images/ui-icons_2e83ff_256x240.png", "themes/base/minified/images/ui-icons_454545_256x240.png", "themes/base/minified/images/ui-icons_888888_256x240.png", "themes/base/minified/images/ui-icons_cd0a0a_256x240.png", "thumbs/screenshot.png"]},
	['prime-spiral-lua'] : {branch:'master', pics:["pi-spiral.png", "prime-spiral.png", "ulam-spiral.png"]},
	['nbody-gpu-lua'] : {branch:'master', pics:["pics/pic1.png"]},
	['convert-to-8x8x4bpp'] : {branch:'master', pics:["results/color 0 tiles.png", "results/color 1 tiles.png", "results/color 10 tiles.png", "results/color 11 tiles.png", "results/color 12 tiles.png", "results/color 13 tiles.png", "results/color 14 tiles.png", "results/color 15 tiles.png", "results/color 2 tiles.png", "results/color 3 tiles.png", "results/color 4 tiles.png", "results/color 5 tiles.png", "results/color 6 tiles.png", "results/color 7 tiles.png", "results/color 8 tiles.png", "results/color 9 tiles.png", "results/color quant15 0 tiles.png", "results/color quant15 1 tiles.png", "results/color quant15 10 tiles.png", "results/color quant15 11 tiles.png", "results/color quant15 12 tiles.png", "results/color quant15 13 tiles.png", "results/color quant15 14 tiles.png", "results/color quant15 15 tiles.png", "results/color quant15 2 tiles.png", "results/color quant15 3 tiles.png", "results/color quant15 4 tiles.png", "results/color quant15 5 tiles.png", "results/color quant15 6 tiles.png", "results/color quant15 7 tiles.png", "results/color quant15 8 tiles.png", "results/color quant15 9 tiles.png", "results/map-tex-region-0-small-brighter-16tiles-16colors-dsqa-quant-tiles-before.png", "results/map-tex-region-0-small-brighter-16tiles-16colors-dsqa.png", "results/map-tex-region-0-small-brighter-1pix-per-tile-after-color-adjust.png", "results/map-tex-region-0-small-brighter-1pix-per-tile-after-downsample.png", "results/map-tex-region-0-small-brighter-1pix-per-tile-after-quant.png", "results/map-tex-region-0-small-brighter-1pix-per-tile-before-downsample.png", "results/map-tex-region-0-small-brighter-dsqa-palette.png", "results/map-tex-region-0-small-brighter-quantize-tile-map.png", "results/map-tex-region-0-small-brighter-quantized-tiles.png", "results/map-tex-region-0-small-brighter.png", "results/map-tex-region-0-small.png", "results/map-tex-region-0.png", "results/map-tex-region-1-small-brighter-16tiles-16colors-dsqa-quant-tiles-before.png", "results/map-tex-region-1-small-brighter-16tiles-16colors-dsqa.png", "results/map-tex-region-1-small-brighter-1pix-per-tile-after-color-adjust.png", "results/map-tex-region-1-small-brighter-1pix-per-tile-after-downsample.png", "results/map-tex-region-1-small-brighter-1pix-per-tile-after-quant.png", "results/map-tex-region-1-small-brighter-1pix-per-tile-before-downsample.png", "results/map-tex-region-1-small-brighter-dsqa-palette.png", "results/map-tex-region-1-small-brighter-quantize-tile-map.png", "results/map-tex-region-1-small-brighter-quantized-tiles.png", "results/map-tex-region-1-small-brighter.png", "results/map-tex-region-1-small.png", "results/map-tex-region-1.png", "results/map-tex-region-2-small-brighter-16tiles-16colors-dsqa-quant-tiles-before.png", "results/map-tex-region-2-small-brighter-16tiles-16colors-dsqa.png", "results/map-tex-region-2-small-brighter-1pix-per-tile-after-color-adjust.png", "results/map-tex-region-2-small-brighter-1pix-per-tile-after-downsample.png", "results/map-tex-region-2-small-brighter-1pix-per-tile-after-quant.png", "results/map-tex-region-2-small-brighter-1pix-per-tile-before-downsample.png", "results/map-tex-region-2-small-brighter-dsqa-palette.png", "results/map-tex-region-2-small-brighter-quantize-tile-map.png", "results/map-tex-region-2-small-brighter-quantized-tiles.png", "results/map-tex-region-2-small-brighter.png", "results/map-tex-region-2-small.png", "results/map-tex-region-2.png", "results/map-tex-region-3-small-brighter-16tiles-16colors-dsqa-quant-tiles-before.png", "results/map-tex-region-3-small-brighter-16tiles-16colors-dsqa.png", "results/map-tex-region-3-small-brighter-1pix-per-tile-after-color-adjust.png", "results/map-tex-region-3-small-brighter-1pix-per-tile-after-downsample.png", "results/map-tex-region-3-small-brighter-1pix-per-tile-after-quant.png", "results/map-tex-region-3-small-brighter-1pix-per-tile-before-downsample.png", "results/map-tex-region-3-small-brighter-dsqa-palette.png", "results/map-tex-region-3-small-brighter-quantize-tile-map.png", "results/map-tex-region-3-small-brighter-quantized-tiles.png", "results/map-tex-region-3-small-brighter.png", "results/map-tex-region-3-small.png", "results/map-tex-region-3.png", "results/map-tex-region-4-small-brighter-16tiles-16colors-dsqa-quant-tiles-before.png", "results/map-tex-region-4-small-brighter-16tiles-16colors-dsqa.png", "results/map-tex-region-4-small-brighter-1pix-per-tile-after-color-adjust.png", "results/map-tex-region-4-small-brighter-1pix-per-tile-after-downsample.png", "results/map-tex-region-4-small-brighter-1pix-per-tile-after-quant.png", "results/map-tex-region-4-small-brighter-1pix-per-tile-before-downsample.png", "results/map-tex-region-4-small-brighter-dsqa-palette.png", "results/map-tex-region-4-small-brighter-quantize-tile-map.png", "results/map-tex-region-4-small-brighter-quantized-tiles.png", "results/map-tex-region-4-small-brighter.png", "results/map-tex-region-4-small.png", "results/map-tex-region-4.png", "results/map-tex-region-5-small-brighter-16tiles-16colors-dsqa-quant-tiles-before.png", "results/map-tex-region-5-small-brighter-16tiles-16colors-dsqa.png", "results/map-tex-region-5-small-brighter-1pix-per-tile-after-color-adjust.png", "results/map-tex-region-5-small-brighter-1pix-per-tile-after-downsample.png", "results/map-tex-region-5-small-brighter-1pix-per-tile-after-quant.png", "results/map-tex-region-5-small-brighter-1pix-per-tile-before-downsample.png", "results/map-tex-region-5-small-brighter-dsqa-palette.png", "results/map-tex-region-5-small-brighter-quantize-tile-map.png", "results/map-tex-region-5-small-brighter-quantized-tiles.png", "results/map-tex-region-5-small-brighter.png", "results/map-tex-region-5-small.png", "results/map-tex-region-5.png", "results/map-tex-region-6-small-brighter-16tiles-16colors-dsqa-quant-tiles-before.png", "results/map-tex-region-6-small-brighter-16tiles-16colors-dsqa.png", "results/map-tex-region-6-small-brighter-1pix-per-tile-after-color-adjust.png", "results/map-tex-region-6-small-brighter-1pix-per-tile-after-downsample.png", "results/map-tex-region-6-small-brighter-1pix-per-tile-after-quant.png", "results/map-tex-region-6-small-brighter-1pix-per-tile-before-downsample.png", "results/map-tex-region-6-small-brighter-dsqa-palette.png", "results/map-tex-region-6-small-brighter-quantize-tile-map.png", "results/map-tex-region-6-small-brighter-quantized-tiles.png", "results/map-tex-region-6-small-brighter.png", "results/map-tex-region-6-small.png", "results/map-tex-region-6.png", "results/map-tex-region-7-small-brighter-16tiles-16colors-dsqa-quant-tiles-before.png", "results/map-tex-region-7-small-brighter-16tiles-16colors-dsqa.png", "results/map-tex-region-7-small-brighter-1pix-per-tile-after-color-adjust.png", "results/map-tex-region-7-small-brighter-1pix-per-tile-after-downsample.png", "results/map-tex-region-7-small-brighter-1pix-per-tile-after-quant.png", "results/map-tex-region-7-small-brighter-1pix-per-tile-before-downsample.png", "results/map-tex-region-7-small-brighter-dsqa-palette.png", "results/map-tex-region-7-small-brighter-quantize-tile-map.png", "results/map-tex-region-7-small-brighter-quantized-tiles.png", "results/map-tex-region-7-small-brighter.png", "results/map-tex-region-7-small.png", "results/map-tex-region-7.png"]},
	['earth-transport-network'] : {branch:'master', pics:["docs/1.png", "docs/2.png", "docs/3.png", "docs/4.png", "earth-color.png"]},
	['Topple'] : {branch:'master', pics:["images/1048576.png", "images/3D.png", "results.png"]},
	['seismographic-stations'] : {branch:'master', pics:["sensor-locations.png", "earth-color.png"]},
	['rule110-lua'] : {branch:'master', pics:["pic.png"]},
	['dungeons-n-munchers-lua'] : {branch:'master', pics:["hero.png", "hero_chomp.png"]},
	['line-integral-convolution-lua'] : {branch:'master', pics:["pic.png"]},
	['waves-in-curved-space'] : {branch:'master', pics:["pics/pic3.png", "pics/pic1.png", "pics/pic2.png", "pics/pic4.png", "pics/pic5.png", "pics/pic6.png", "pics/pic7.png"]},
	['MatMulKernelTest'] : {branch:'master', pics:["comparison-min-double.png", "comparison-min-float.png"]},
	['webtactics'] : {branch:'master', pics:["client/gender/female.png", "client/gender/male.png", "client/images/icons-18-black.png", "client/images/icons-18-white.png", "client/images/icons-36-black.png", "client/images/icons-36-white.png", "client/items/108Gems.png", "client/items/AdamanVest.png", "client/items/AegisShield.png", "client/items/AirKnife.png", "client/items/AncientSword.png", "client/items/AngelRing.png", "client/items/Antidote.png", "client/items/AssassinDagger.png", "client/items/AsuraKnife.png", "client/items/Barbuta.png", "client/items/Barette.png", "client/items/BattleAxe.png", "client/items/BattleBamboo.png", "client/items/BattleBoots.png", "client/items/BattleDict.png", "client/items/BizenBoat.png", "client/items/BlackCostume.png", "client/items/BlackHood.png", "client/items/BlackRobe.png", "client/items/BlastGun.png", "client/items/BlazeGun.png", "client/items/BlindKnife.png", "client/items/BloodSword.png", "client/items/BloodyStrings.png", "client/items/BowGun.png", "client/items/Bracer.png", "client/items/Brigandine.png", "client/items/BroadSword.png", "client/items/BronzeArmor.png", "client/items/BronzeHelmet.png", "client/items/BronzeShield.png", "client/items/Buckler.png", "client/items/CBag.png", "client/items/Cachusha.png", "client/items/CarabiniMail.png", "client/items/Cashmere.png", "client/items/ChainMail.png", "client/items/ChainVest.png", "client/items/ChameleonRobe.png", "client/items/Chantage.png", "client/items/ChaosBlade.png", "client/items/Cherche.png", "client/items/Chirijiraden.png", "client/items/Circlet.png", "client/items/Clothes.png", "client/items/CoralSword.png", "client/items/CrossBow.png", "client/items/CrossHelmet.png", "client/items/CrystalHelmet.png", "client/items/CrystalMail.png", "client/items/CrystalShield.png", "client/items/CursedRing.png", "client/items/CypressRod.png", "client/items/Dagger.png", "client/items/Defender.png", "client/items/DefenseArmlet.png", "client/items/DefenseRing.png", "client/items/DiamondArmlet.png", "client/items/DiamondArmor.png", "client/items/DiamondHelmet.png", "client/items/DiamondShield.png", "client/items/DiamondSword.png", "client/items/DraculaMantle.png", "client/items/DragonRod.png", "client/items/DragonWhisker.png", "client/items/EarthClothes.png", "client/items/EchoGrass.png", "client/items/ElfMantle.png", "client/items/Elixir.png", "client/items/Escutcheon.png", "client/items/Escutcheon2.png", "client/items/Ether.png", "client/items/Excalibur.png", "client/items/EyeDrop.png", "client/items/FSBag.png", "client/items/FairyHarp.png", "client/items/FaithRod.png", "client/items/FeatherBoots.png", "client/items/FeatherHat.png", "client/items/FeatherMantle.png", "client/items/FireBall.png", "client/items/Flail.png", "client/items/FlameRod.png", "client/items/FlameShield.png", "client/items/FlameWhip.png", "client/items/FlashHat.png", "client/items/Gastrafitis.png", "client/items/GenjiArmor.png", "client/items/GenjiGauntlet.png", "client/items/GenjiHelmet.png", "client/items/GenjiShield.png", "client/items/GerminasBoots.png", "client/items/GiantAxe.png", "client/items/GlacierGun.png", "client/items/GokuuRod.png", "client/items/GoldArmor.png", "client/items/GoldHelmet.png", "client/items/GoldShield.png", "client/items/GoldStaff.png", "client/items/GoldenHairpin.png", "client/items/GrandHelmet.png", "client/items/GreenBeret.png", "client/items/HBag.png", "client/items/Headgear.png", "client/items/HealingStaff.png", "client/items/HeavensCloud.png", "client/items/HiEther.png", "client/items/HiPotion.png", "client/items/HiddenKnife.png", "client/items/HolyLance.png", "client/items/HolyMiter.png", "client/items/HolyWater.png", "client/items/HuntingBow.png", "client/items/IceBow.png", "client/items/IceBrand.png", "client/items/IceRod.png", "client/items/IceShield.png", "client/items/IgaKnife.png", "client/items/IronFan.png", "client/items/IronHelmet.png", "client/items/IronSword.png", "client/items/IvoryRod.png", "client/items/JadeArmlet.png", "client/items/Javelin.png", "client/items/Javelin2.png", "client/items/JudoOutfit.png", "client/items/KaiserPlate.png", "client/items/Kikuichimoji.png", "client/items/Kiyomori.png", "client/items/KogaKnife.png", "client/items/KoutetsuKnife.png", "client/items/LeatherArmor.png", "client/items/LeatherHat.png", "client/items/LeatherHelmet.png", "client/items/LeatherMantle.png", "client/items/LeatherOutfit.png", "client/items/LeatherVest.png", "client/items/LightRobe.png", "client/items/LightningBall.png", "client/items/LightningBow.png", "client/items/LinenCuirass.png", "client/items/LinenRobe.png", "client/items/LongBow.png", "client/items/LongSword.png", "client/items/MaceofZeus.png", "client/items/Madlemgen.png", "client/items/MageMasher.png", "client/items/MagicGauntlet.png", "client/items/MagicRing.png", "client/items/MagicShuriken.png", "client/items/MaidensKiss.png", "client/items/MainGauche.png", "client/items/Masamune.png", "client/items/MateriaBlade.png", "client/items/Maximillian.png", "client/items/MonsterDict.png", "client/items/MorningStar.png", "client/items/Muramasa.png", "client/items/Murasame.png", "client/items/MuskRod.png", "client/items/MythrilArmor.png", "client/items/MythrilBow.png", "client/items/MythrilGun.png", "client/items/MythrilHelmet.png", "client/items/MythrilKnife.png", "client/items/MythrilShield.png", "client/items/MythrilSpear.png", "client/items/MythrilSword.png", "client/items/MythrilVest.png", "client/items/NKaiArmlet.png", "client/items/Nagrarock.png", "client/items/NightKiller.png", "client/items/NinjaEdge.png", "client/items/NinjaKnife.png", "client/items/OakStaff.png", "client/items/Oberisk.png", "client/items/OctagonRod.png", "client/items/Orichalcum.png", "client/items/PBag.png", "client/items/PapyrusPlate.png", "client/items/Partisan.png", "client/items/PerseusBow.png", "client/items/Persia.png", "client/items/PhoenixDown.png", "client/items/PlateMail.png", "client/items/PlatinaArmor.png", "client/items/PlatinaDagger.png", "client/items/PlatinaHelmet.png", "client/items/PlatinaShield.png", "client/items/PlatinumSword.png", "client/items/PoisonBow.png", "client/items/PoisonRod.png", "client/items/Potion.png", "client/items/PowerSleeve.png", "client/items/PowerWrist.png", "client/items/Ragnarok.png", "client/items/RainbowStaff.png", "client/items/RamiaHarp.png", "client/items/RedHood.png", "client/items/RedShoes.png", "client/items/ReflectMail.png", "client/items/ReflectRing.png", "client/items/Remedy.png", "client/items/Ribbon.png", "client/items/RobeofLords.png", "client/items/Rod.png", "client/items/RomandaGun.png", "client/items/RoundShield.png", "client/items/RubberCostume.png", "client/items/RubberShoes.png", "client/items/RuneBlade.png", "client/items/RyozanSilk.png", "client/items/SageStaff.png", "client/items/SaltyRage.png", "client/items/SasukeKnife.png", "client/items/SavetheQueen.png", "client/items/ScorpionTail.png", "client/items/SecretClothes.png", "client/items/Setiemson.png", "client/items/ShortEdge.png", "client/items/Shuriken.png", "client/items/SilkRobe.png", "client/items/SilverBow.png", "client/items/Slasher.png", "client/items/SleepSword.png", "client/items/SmallMantle.png", "client/items/Soft.png", "client/items/Spear.png", "client/items/SpellEdge.png", "client/items/SpikeBoots.png", "client/items/SprintShoes.png", "client/items/StoneGun.png", "client/items/ThiefHat.png", "client/items/ThunderRod.png", "client/items/TriangleHat.png", "client/items/TwistHeadband.png", "client/items/UltimusBow.png", "client/items/VanishMantle.png", "client/items/VenetianShield.png", "client/items/WaterBall.png", "client/items/WhaleWhisker.png", "client/items/WhiteRobe.png", "client/items/WhiteStaff.png", "client/items/WindslashBow.png", "client/items/WizardMantle.png", "client/items/WizardOutfit.png", "client/items/WizardRobe.png", "client/items/WizardRod.png", "client/items/WizardStaff.png", "client/items/XPotion.png", "client/items/YagyuDarkness.png", "client/items/YoichiBow.png", "client/items/ZorlinShape.png", "client/jquery.mobile-1.2.0/demos/css/themes/default/images/icons-18-black.png", "client/jquery.mobile-1.2.0/demos/css/themes/default/images/icons-18-white.png", "client/jquery.mobile-1.2.0/demos/css/themes/default/images/icons-36-black.png", "client/jquery.mobile-1.2.0/demos/css/themes/default/images/icons-36-white.png", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/colorful-city.jpg", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/firefox-logo.png", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/ios-startup-hd.png", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/ios_icon.png", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/ios_icon_114.png", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/ios_icon_144.png", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/ios_icon_57.png", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/ios_icon_72.png", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/ios_startup.png", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/jqm-sitebg.png", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/jquery-logo.png", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/mobile-devices.png", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/photo-landscape.jpg", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/photo-portrait.jpg", "client/jquery.mobile-1.2.0/demos/docs/_assets/images/themroller-mobile-logo.png", "client/jquery.mobile-1.2.0/demos/docs/lists/images/album-af.jpg", "client/jquery.mobile-1.2.0/demos/docs/lists/images/album-ag.jpg", "client/jquery.mobile-1.2.0/demos/docs/lists/images/album-bb.jpg", "client/jquery.mobile-1.2.0/demos/docs/lists/images/album-bk.jpg", "client/jquery.mobile-1.2.0/demos/docs/lists/images/album-hc.jpg", "client/jquery.mobile-1.2.0/demos/docs/lists/images/album-k.jpg", "client/jquery.mobile-1.2.0/demos/docs/lists/images/album-mg.jpg", "client/jquery.mobile-1.2.0/demos/docs/lists/images/album-ok.jpg", "client/jquery.mobile-1.2.0/demos/docs/lists/images/album-p.jpg", "client/jquery.mobile-1.2.0/demos/docs/lists/images/album-rh.jpg", "client/jquery.mobile-1.2.0/demos/docs/lists/images/album-ws.jpg", "client/jquery.mobile-1.2.0/demos/docs/lists/images/album-xx.jpg", "client/jquery.mobile-1.2.0/demos/docs/lists/images/de.png", "client/jquery.mobile-1.2.0/demos/docs/lists/images/fi.png", "client/jquery.mobile-1.2.0/demos/docs/lists/images/gb.png", "client/jquery.mobile-1.2.0/demos/docs/lists/images/gf.png", "client/jquery.mobile-1.2.0/demos/docs/lists/images/sj.png", "client/jquery.mobile-1.2.0/demos/docs/lists/images/us.png", "client/jquery.mobile-1.2.0/demos/docs/toolbars/glyphish-icons/09-chat2.png", "client/jquery.mobile-1.2.0/demos/docs/toolbars/glyphish-icons/100-coffee.png", "client/jquery.mobile-1.2.0/demos/docs/toolbars/glyphish-icons/18-envelope.png", "client/jquery.mobile-1.2.0/demos/docs/toolbars/glyphish-icons/19-gear.png", "client/jquery.mobile-1.2.0/demos/docs/toolbars/glyphish-icons/21-skull.png", "client/jquery.mobile-1.2.0/demos/docs/toolbars/glyphish-icons/30-key.png", "client/jquery.mobile-1.2.0/demos/docs/toolbars/glyphish-icons/34-coffee.png", "client/jquery.mobile-1.2.0/demos/docs/toolbars/glyphish-icons/88-beermug.png", "client/jquery.mobile-1.2.0/demos/docs/toolbars/images/photo-run.jpeg", "client/jquery.mobile-1.2.0/images/icons-18-black.png", "client/jquery.mobile-1.2.0/images/icons-18-white.png", "client/jquery.mobile-1.2.0/images/icons-36-black.png", "client/jquery.mobile-1.2.0/images/icons-36-white.png", "client/objs/city.png", "client/objs/stone1.png", "client/objs/stone2.png", "client/objs/stone3.png", "client/objs/treasure.png", "client/simurgh-original.jpg", "client/simurgh.jpg", "client/sprites/sheet_banon.png", "client/sprites/sheet_celes.png", "client/sprites/sheet_cyan.png", "client/sprites/sheet_edgar.png", "client/sprites/sheet_gau.png", "client/sprites/sheet_ghost.png", "client/sprites/sheet_gogo.png", "client/sprites/sheet_imp.png", "client/sprites/sheet_kefka.png", "client/sprites/sheet_leo.png", "client/sprites/sheet_locke.png", "client/sprites/sheet_merchant.png", "client/sprites/sheet_mog.png", "client/sprites/sheet_morphedTerra.png", "client/sprites/sheet_relm.png", "client/sprites/sheet_sabin.png", "client/sprites/sheet_setzer.png", "client/sprites/sheet_shadow.png", "client/sprites/sheet_soldier.png", "client/sprites/sheet_strago.png", "client/sprites/sheet_terra.png", "client/sprites/sheet_umaro.png", "client/tiles/texpack.png", "client/ui/area.png", "client/ui/battlecursor.png", "client/ui/dice.png", "client/ui/edit.png", "client/ui/equip-accessory.png", "client/ui/equip-armor.png", "client/ui/equip-helmet.png", "client/ui/equip-lhand.png", "client/ui/equip-rhand.png", "client/ui/exitbattle.png", "client/ui/move-selected.png", "client/ui/rot-left.png", "client/ui/rot-right.png", "client/ui/selected.png", "client/ui/skill-command.png", "client/ui/skill-movement.png", "client/ui/skill-reaction.png", "client/ui/skill-support.png", "client/ui/zoom-in.png", "client/ui/zoom-out.png", "client/zodiac/aquarius.png", "client/zodiac/aries.png", "client/zodiac/cancer.png", "client/zodiac/capricorn.png", "client/zodiac/gemini.png", "client/zodiac/leo.png", "client/zodiac/libra.png", "client/zodiac/pisces.png", "client/zodiac/sagittarius.png", "client/zodiac/scorpio.png", "client/zodiac/taurus.png", "client/zodiac/virgo.png", "obj-staging/objs/bridge-wood.png", "obj-staging/objs/cobblestone-grass-1.png", "obj-staging/objs/cobblestone-grass-2.png", "obj-staging/objs/cobblestone-grass-corner.png", "obj-staging/objs/cobblestone-grass-edge.png", "obj-staging/objs/cobblestone-grass-turn.png", "obj-staging/objs/cobblestone.png", "obj-staging/objs/dirt-grass-corner.png", "obj-staging/objs/dirt-grass-edge.png", "obj-staging/objs/dirt.png", "obj-staging/objs/door-dark.png", "obj-staging/objs/door.png", "obj-staging/objs/grass-bottom.png", "obj-staging/objs/grass-light.png", "obj-staging/objs/grass-side.png", "obj-staging/objs/grass-top.png", "obj-staging/objs/house-base.png", "obj-staging/objs/house-wall.png", "obj-staging/objs/house-window.png", "obj-staging/objs/sand.png", "obj-staging/objs/shingles-side.png", "obj-staging/objs/shingles.png", "obj-staging/objs/stone.png", "obj-staging/objs/water.png"]},
	['chompman'] : {branch:'master', pics:["pic1.png"]},
	['fibonacci-modulo'] : {branch:'master', pics:["pics/collage.png", "pics/1001.png", "pics/modulo-density.png"]},
	['luajit-pureffi'] : {branch:'main', pics:["examples/vulkan/capsadmin.png"]},
	['worldgen'] : {branch:'master', pics:["out.png"]},
	['bank-game-js'] : {branch:'master', pics:["bank.png", "close.png", "icons/down.png", "icons/left.png", "icons/ok.png", "icons/right.png", "icons/up.png", "images/cross.png", "images/menu.png", "images/pencil.png", "res/drawable/0.png", "res/drawable/1.png", "res/drawable/2.png", "res/drawable/3.png", "res/drawable/4.png", "res/drawable/5.png", "res/drawable/6.png", "res/drawable/7.png", "res/drawable/8.png", "res/drawable/9.png", "res/drawable/bomb.png", "res/drawable/bomb_lit.png", "res/drawable/bomb_sunk.png", "res/drawable/bricks.png", "res/drawable/button_bomb.png", "res/drawable/button_dpad.png", "res/drawable/cloud.png", "res/drawable/door.png", "res/drawable/dot.png", "res/drawable/flame.png", "res/drawable/framer.png", "res/drawable/gloves.png", "res/drawable/ground.png", "res/drawable/key.png", "res/drawable/key_grey.png", "res/drawable/medusa.png", "res/drawable/medusa_pissed.png", "res/drawable/money.png", "res/drawable/sentry1.png", "res/drawable/sentry2.png", "res/drawable/stone.png", "res/drawable/teeth_dead.png", "res/drawable/teeth_down.png", "res/drawable/teeth_down_step.png", "res/drawable/teeth_left.png", "res/drawable/teeth_left_step.png", "res/drawable/teeth_right.png", "res/drawable/teeth_right_step.png", "res/drawable/teeth_up.png", "res/drawable/teeth_up_step.png", "res/drawable/tree.png", "res/drawable/water.png"]},
	['faraday-cage'] : {branch:'master', pics:["phi-out-raw.png"]},
	['geo-center-earth'] : {branch:'master', pics:["screenshot.png", "continent-mask-3.png"]},
	['cfdmeshlua'] : {branch:'master', pics:["pic.png"]},
	['celestial-gravitomagnetics-lua'] : {branch:'master', pics:["images/averageDistanceToSun vs orbitalPeriod.png", "images/averageDistanceToSun.png", "images/averageTangentVelocity.png", "images/density.png", "images/embeddingRadius.png", "images/gravitationConstantInUnitsOfPlanetOrbit.png", "images/mass.png", "images/newtonianGravitationalForceFromSun.png", "images/orbitalAngularMomentum.png", "images/orbitalAngularVelocity.png", "images/orbitalInertia.png", "images/orbitalKineticEnergy.png", "images/orbitalPeriod.png", "images/radius vs mass.png", "images/radius.png", "images/rotation vs revolution kinetic energy.png", "images/rotationAngularMomentum.png", "images/rotationAngularVelocity.png", "images/rotationAxis.png", "images/rotationGravitomagneticForceAtCenter.png", "images/rotationInertia.png", "images/rotationKineticEnergy.png", "images/rotationPeriod.png", "images/totalKineticEnergy .png", "images/totalKineticEnergy.png", "images/volume.png", "sim_images/pic1.png", "sim_images/pic2.png"]},
	['pi-z-curve'] : {branch:'master', pics:["pi-binary.png", "pi-hex-color.png", "pi-hex-grey.png"]},
	['Image'] : {branch:'master', pics:["test/res/test.jpeg", "test/res/test.png"]},
	['regge-lua'] : {branch:'master', pics:["pic.png", "pic2.png", "pic3.png"]},
	['stupidrpg-game-js'] : {branch:'master', pics:["icons/cancel.png", "icons/down.png", "icons/left.png", "icons/ok.png", "icons/right.png", "icons/up.png", "images/bricks.png", "images/grass.png", "images/grass2.png", "images/grass3.png", "images/stone.png", "images/trees.png", "images/wall.png", "images/water.png", "objs/boat.png", "objs/damage-bludgeon.png", "objs/damage-pierce.png", "objs/damage-slash.png", "objs/dead.png", "objs/deer.png", "objs/door.png", "objs/downstairs.png", "objs/fighter.png", "objs/firewall.png", "objs/fish.png", "objs/frog.png", "objs/hero.png", "objs/imp.png", "objs/merchant.png", "objs/orc.png", "objs/seamonster.png", "objs/shop-armor-sign.png", "objs/shop-food-sign.png", "objs/shop-heal-sign.png", "objs/shop-item-sign.png", "objs/shop-relic-sign.png", "objs/shop-spell-sign.png", "objs/shop-weapon-sign.png", "objs/snake.png", "objs/thief.png", "objs/town.png", "objs/treasure.png", "objs/upstairs.png", "stupid-background.png"]},
	['elemental'] : {branch:'master', pics:["app_elemental.png", "assets/help.png", "close.png", "images/icons-18-black.png", "images/icons-18-white.png", "images/icons-36-black.png", "images/icons-36-white.png", "res/drawable/app_elemental.png", "res/drawable/background.png", "res/drawable/bg1.jpg", "res/drawable/bg10.jpg", "res/drawable/bg100.jpg", "res/drawable/bg11.jpg", "res/drawable/bg12.jpg", "res/drawable/bg13.jpg", "res/drawable/bg14.jpg", "res/drawable/bg15.jpg", "res/drawable/bg16.jpg", "res/drawable/bg17.jpg", "res/drawable/bg18.jpg", "res/drawable/bg19.jpg", "res/drawable/bg2.jpg", "res/drawable/bg20.jpg", "res/drawable/bg21.jpg", "res/drawable/bg22.jpg", "res/drawable/bg23.jpg", "res/drawable/bg24.jpg", "res/drawable/bg25.jpg", "res/drawable/bg26.jpg", "res/drawable/bg27.jpg", "res/drawable/bg28.jpg", "res/drawable/bg29.jpg", "res/drawable/bg3.jpg", "res/drawable/bg30.jpg", "res/drawable/bg31.jpg", "res/drawable/bg32.jpg", "res/drawable/bg33.jpg", "res/drawable/bg34.jpg", "res/drawable/bg35.jpg", "res/drawable/bg36.jpg", "res/drawable/bg37.jpg", "res/drawable/bg38.jpg", "res/drawable/bg39.jpg", "res/drawable/bg4.jpg", "res/drawable/bg40.jpg", "res/drawable/bg41.jpg", "res/drawable/bg42.jpg", "res/drawable/bg43.jpg", "res/drawable/bg44.jpg", "res/drawable/bg45.jpg", "res/drawable/bg46.jpg", "res/drawable/bg47.jpg", "res/drawable/bg48.jpg", "res/drawable/bg49.jpg", "res/drawable/bg5.jpg", "res/drawable/bg50.jpg", "res/drawable/bg51.jpg", "res/drawable/bg52.jpg", "res/drawable/bg53.jpg", "res/drawable/bg54.jpg", "res/drawable/bg55.jpg", "res/drawable/bg56.jpg", "res/drawable/bg57.jpg", "res/drawable/bg58.jpg", "res/drawable/bg59.jpg", "res/drawable/bg6.jpg", "res/drawable/bg60.jpg", "res/drawable/bg61.jpg", "res/drawable/bg62.jpg", "res/drawable/bg63.jpg", "res/drawable/bg64.jpg", "res/drawable/bg65.jpg", "res/drawable/bg66.jpg", "res/drawable/bg67.jpg", "res/drawable/bg68.jpg", "res/drawable/bg69.jpg", "res/drawable/bg7.jpg", "res/drawable/bg70.jpg", "res/drawable/bg71.jpg", "res/drawable/bg72.jpg", "res/drawable/bg73.jpg", "res/drawable/bg74.jpg", "res/drawable/bg75.jpg", "res/drawable/bg76.jpg", "res/drawable/bg77.jpg", "res/drawable/bg78.jpg", "res/drawable/bg79.jpg", "res/drawable/bg8.jpg", "res/drawable/bg80.jpg", "res/drawable/bg81.jpg", "res/drawable/bg82.jpg", "res/drawable/bg83.jpg", "res/drawable/bg84.jpg", "res/drawable/bg85.jpg", "res/drawable/bg86.jpg", "res/drawable/bg87.jpg", "res/drawable/bg88.jpg", "res/drawable/bg89.jpg", "res/drawable/bg9.jpg", "res/drawable/bg90.jpg", "res/drawable/bg91.jpg", "res/drawable/bg92.jpg", "res/drawable/bg93.jpg", "res/drawable/bg94.jpg", "res/drawable/bg95.jpg", "res/drawable/bg96.jpg", "res/drawable/bg97.jpg", "res/drawable/bg98.jpg", "res/drawable/bg99.jpg", "res/drawable/button_down.png", "res/drawable/button_up.png", "res/drawable/circle_blue.png", "res/drawable/circle_green.png", "res/drawable/circle_purple.png", "res/drawable/circle_red.png", "res/drawable/circle_yellow.png", "res/drawable/cross_blue.png", "res/drawable/cross_green.png", "res/drawable/cross_purple.png", "res/drawable/cross_red.png", "res/drawable/cross_yellow.png", "res/drawable/cursor.png", "res/drawable/tile_blue.png", "res/drawable/tile_empty.png", "res/drawable/tile_green.png", "res/drawable/tile_purple.png", "res/drawable/tile_red.png", "res/drawable/tile_yellow.png"]},
	['DominionCardChooser'] : {branch:'master', pics:["images/icons-18-black.png", "images/icons-18-white.png", "images/icons-36-black.png", "images/icons-36-white.png"]},
	['swinekeeper'] : {branch:'master', pics:["doge.jpg"]},
	['lua128'] : {branch:'master', pics:["doc/osi-certified-72x60.png"]},
	['wii-sdl-luajit'] : {branch:'master', pics:["dist/icon.png", "dist/test.png"]},
	['HydrodynamicsGPU'] : {branch:'master', pics:["res/test-solid.png"]},
	['CFDMesh'] : {branch:'master', pics:["screenshot.png", "res/layout.png"]},
	['mmo-js'] : {branch:'master', pics:["cursor.png", "sprite.png"]},
	['ImageProcessing'] : {branch:'master', pics:["lua-blurred-unblurred-cg.png", "lua-blurred-unblurred-cr.png", "lua-blurred.png", "matlab-blurred-unblurred.png", "matlab-blurred.png", "modified-restored.png", "source.png"]},
	['FFTactics_BlenderPlugin'] : {branch:'master', pics:["example.png", "example_pal.png", "example_terrain.png", "step1.png", "step2.png"]},
	['Sod_exact'] : {branch:'master', pics:["results.png"]},
};

for (const [repoName,repo] of Object.entries(projectThumbs)) {
	const p = projectsByHref['https://github.com/thenumbernine/'+repoName];
	if (p && !p.img && repo.pics) {
		const user = 'thenumbernine';
		let pic = repo.pics[0];
		if (!pic.startsWith('https://')) {
			pic = 'https://raw.githubusercontent.com/'+user+'/'+repoName+'/refs/heads/'+repo.branch+'/'+pic;
		}
		p.img = pic;
	}
}

const cardGrid = document.querySelector('.card-grid');
projects.forEach(p => cardGrid.appendChild(p.dom()));

/* show all tags:
const tags = {};
projects.forEach(p => {
	(p.tags ?? []).forEach(
		t => {
			// javascript is dumb and cannot combine these two into one statement...
			tags[t] ??= 0;
			tags[t]++;
		}
	);
});
console.log('all tags');
//console.log(JSON.stringify(tags));	// it'd be nice to sort this by value...
Object.keys(tags)
.sort((a,b) => tags[b] - tags[a])
.forEach(k => console.log(tags[k], k));

/*
all tags >1:
89 'lua'
84 'luajit'
48 'math'
35 'c++'
31 'games'
30 'js'
17 'webgl'
15 'astronomy'
15 'physics'
12 'opengl'
9 'general-relativity'
8 'gpgpu'
8 'finite-volume'
7 'geography'
7 'cfd'
7 'sdl'
7 'parser'
5 'automata'
5 'diff-geom'
5 'android'
4 'langfix'
4 'voxel'
4 'romhacking'
4 'trpg'
4 'imgui'
4 'opencl'
4 'optimization'
4 'multithreading'
4 'einstein-equations'
3 'volume-render'
3 'multiplayer'
3 'ff6'
3 'snes'
3 'wasm'
3 'emscripten'
3 'header-bindings'
3 'numerical-relativity'
3 'c'
3 'symmath'
3 'cards'
2 'bignumber'
2 'cpu'
2 'randomizer'
2 'platformer'
2 'fft'
2 'browser'
2 'dynamic-code-generation'
2 'gravitoelectromagnetics'
2 'image-loader'
2 'linear-solver'
2 'vulkan'
2 'webgpu'
2 'unicode'
2 'neuralnet'
2 'mesh'
2 'ast'
2 'transpile'
2 'python'
2 'resource-manager'
2 'profiling'
2 'tensor-algebra'
2 'wii'
*/
