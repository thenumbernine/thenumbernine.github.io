import {merge, A, Article, Br, Div, H3, Img, P, Span} from './js/dom.js';

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
	new ProjectThumb({
		href:'symmath/index.html',
		img:'thumbnails/symmath.png',
		title:'symmath-lua',
		desc:`SymMath, a symbolic math tool (aka "computer algebra system") especially targeted for tensor-index-manipuplation (physics tensors, not stupid AI tensors) and code-generation.
Includes lots of examples with application to cosmology, general relativity, numerical relativity, hydrodynamics, Maxwell equations, and hyperbolic conservation laws.`,
		tags:['math'],
	}),
	new ProjectThumb({
		href:'math.html',
		img:'thumbnails/math-worksheets.png',
		title:'math worksheets',
		desc:`Various math worksheets I've typed up into LaTeX/MathJax. They tend to mirror the topics of the SymMath automatically-generated html output and its mixed html + live output <code>.symmath</code> pages.`,
		tags:['math'],
	}),
	new ProjectThumb({
		href:'4d-renderer/',
		img:'thumbnails/4d-renderer.png',
		title:'4D renderer',
		desc:`4D-mesh-renderer, especially for rendering 4D-voxels, applied to rendering a layout of a 4D hypercube, in WebGL.`,
		tags:['math'],
	}),
	new ProjectThumb({
		href:'conway-life-webgl/',
		img:'thumbnails/conway-life-webgl.png',
		title:"conway's life in webgl",
		desc:`Conway's Life, running on GPU in WebGL.`,
		tags:['math'],
	}),
	new ProjectThumb({
		href:'metric/',
		img:'thumbnails/metric.png',
		title:'metric space visualizer',
		desc:`Manifold property visualization tool, in JavaScript in-browser with WebGL.`,
		tags:['math'],
	}),
	new ProjectThumb({
		href:'octonion-multiplication-table/',
		img:'thumbnails/octonion-multiplication-table.png',
		title:'octonion multiplication table',
		desc:`Visualization of the sub-quaternion multiplication tables found within the Octonions, aligned to a Mobius-strip, in WebGL.`,
		tags:['math'],
	}),
	new ProjectThumb({
		href:'poisson-solver/',
		img:'thumbnails/poisson-solver.png',
		title:'poisson solver',
		desc:`Very simple finite-difference Poisson solver on GPU in WebGL.`,
		tags:['math'],
	}),
	new ProjectThumb({
		href:'topple/',
		img:'thumbnails/topple.png',
		title:'abelian sandpile model in webgl',
		desc:`Abelian sandpile models on the GPU in WebGL.`,
		tags:['math'],
	}),
	new ProjectThumb({
		href:'universe/',
		img:'thumbnails/universe.png',
		title:'cosmic web visualization in webgl',
		desc:`Visualizer of various galaxy surveys.  Useful for visualizing the cosmic web structure.`,
		tags:['astronomy'],
	}),
	new ProjectThumb({
		href:'solarsystem/',
		img:'thumbnails/solarsystem.png',
		title:'solar system visualization in webgl',
		desc:`Solar system visualizer in WebGL.  Includes planets, moons, small-bodies, comets, meteors, stars, exoplaents, and galaxies.`,
		tags:['astronomy'],
	}),
	new ProjectThumb({
		href:'wavefunction/',
		img:'thumbnails/wavefunction.png',
		title:'wavefunction visualization in webgl',
		desc:`Hydrogen atom wavefunction visualization in WebGL.`,
		tags:['astronomy'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/earth-magnetic-field-lua',
		img:'thumbnails/earth-magnetic-field.png',
		title:'earth magnetic field',
		desc:`Various visualizations of the WMM 2025 dataset, including LIC, vector field.  Applied to various basis options of the Earth geographic chart, with options for interpolation between them.`,
		tags:['astronomy'],
	}),
	new ProjectThumb({
		href:'black-hole-skymap/',
		img:'thumbnails/black-hole-skymap.png',
		title:'black hole skymap',
		desc:`Black hole raytracer on GPU, in WebGL.`,
		tags:['astronomy'],
	}),
	new ProjectThumb({
		href:'hydrodynamics/',
		img:'thumbnails/hydrodynamics.png',
		title:'hydrodynamics in webgl',
		desc:`Various CFD schemes, including HLL and Roe, implemented in CPU and GPU (WebGL), in-browser, in JavaScript.`,
		tags:['astronomy'],
	}),
	new ProjectThumb({
		href:'thomas-precession/',
		img:'thumbnails/thomas-precession.png',
		title:'thomas precession visualization',
		desc:`Very ugly and shoddy Thomsas-precession visualizer.`,
		tags:['astronomy'],
	}),
	new ProjectThumb({
		href:'time-dilation/',
		img:'thumbnails/time-dilation.png',
		title:'time dilation visualization',
		desc:`Shoddy time dilation / Twin-Paradox visualizer.`,
		tags:['astronomy'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/numo9',
		img:'thumbnails/numo9.png',
		title:'NuMo9',
		desc:`A Fantasy-Console, somewhere between Pico-8 compatible, 16-bit-era, and voxelmap-engine.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/ff6lib-lua',
		img:'thumbnails/ff6lib.png',
		title:'FF6lib',
		desc:`Editor of Final Fantasy VI USA for SNES.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/farm-game',
		img:'thumbnails/farm-game.png',
		title:'farm game',
		desc:`The start of a farm simulator in the vein of Harvest Moon, except with voxel engine.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/zeta2d',
		img:'thumbnails/zeta2d.png',
		title:'zeta',
		desc:`2D platformer engine, with built-in editor.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/sand-attack',
		img:'thumbnails/sand-attack.png',
		title:'sand-attack',
		desc:`Sand-Tetris clone.  Connect colored lines of falling sand.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/chess-on-manifold-lua',
		img:'thumbnails/chess-on-manifold.png',
		title:'chess on a manifold',
		desc:`What would it be like to play chess on an arbitrary mesh manifold?`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/pong-lua',
		img:'thumbnails/pong.png',
		title:'super-pong',
		desc:`Pong, in LuaJIT+SDL, running in a browser.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'bank-steam/',
		img:'thumbnails/bank-game.png',
		title:'bank game',
		desc:`A block-pushing puzzle game.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'elemental/',
		img:'thumbnails/elemental-game.png',
		title:'elemental puzzle game',
		desc:`A color-matching puzzle game.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'space-game/',
		img:'thumbnails/space-game.png',
		title:'space game',
		desc:`A simple 3D-bullet-hell game running on the GPU in WebGL.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'stupidrpg-game/',
		img:'thumbnails/stupidrpg-game.png',
		title:'stupid rpg game',
		desc:`A stupid RPG game that runs in browser, written in Javascript.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'lua/stupid-text-rpg/',
		img:'thumbnails/stupid-text-rpg.png',
		title:'stupid text TRPG game',
		desc:`A stupid Tactical-RPG game with ascii display, written in Lua, running in-browser.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'swinekeeper/',
		img:'thumbnails/swinekeeper.png',
		title:'swinekeeper game',
		desc:`Minesweeper but with custom kernels used to count neighboring mines.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'dominion/',
		img:'thumbnails/dominion.png',
		title:'dominion deck chooser',
		desc:`Dominion deck chooser with a useful touch-screen interface.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'mario-kart-wii-stat-picker/',
		img:'thumbnails/mario-kart-wii-stat-picker.png',
		title:'mario kart wii stat picker',
		desc:`Mario Kart Wii stat picker.  Choose what stats you want to maximize/minimize (and what weighted combinations) and it will rank karts accordingly.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/fftrpg-numo9',
		title:'fftrpg-numo9',
		desc:`(private repo) Mashup of Final Fantasy 6 and Final Fantasy Tactics, implemented in NuMo9.  Check the NuMo9 discord server for updates.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/webtactics',
		title:'webtactics',
		desc:`(private repo) Browser+server based tactical-rpg game.  Succeeded by FF6T3D in the NuMo9 discord server.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/TacticsLua',
		title:'TacticsLua',
		desc:`(private repo) Pure-LuaJIT Tactical-RPG implementation of Final Fantasy Tactics, and then a mash-up of Final Fantasy 6 in TRPG environment. Succeeded by FF6T3D in the NuMo9 discord server.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/dungeons-n-munchers-js',
		title:'dungeons-n-munchers-js',
		desc:`don't even ask :-p`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/zeta-js',
		title:'zeta-js',
		desc:`Very very preliminary start of a procedural platformer in javascript.`,
		tags:['games'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/biggun-quake',
		title:'biggun-quake',
		desc:`A quake 1 mod I made.`,
		tags:['games'],
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
		desc:`for building Lua + luaffifb to wasm for the browser port of my LuaJIT + OpenGL + SDL framework`,
		tags:['luajit','browser','js','wasm','emscripten'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/luaffifb',
		title:'luaffifb',
		desc:`my fork of the old facebookarchive FFI-for-vanilla-Lua`,
		tags:['luajit','browser','js','wasm','emscripten'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-ffi-for-js',
		title:'lua-ffi-for-js',
		desc:`LuaJIT's FFI library written in pure-lua for use with minimal javascript interface.  Superceded by my lua-ffi-wasm project, but still around because it still has its uses.`,
		tags:['luajit','js'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/SDLLuaJIT-android',
		title:'SDLLuaJIT-android',
		desc:`SDL+LuaJIT launcher in Android.  Works as a distict repo and not as a dependency of my LuaJIT-android project.  This inspired me to make LuaJIT-android after seeing how horribly bloated (wasting 100x-1000x the required disk space) all Android projects are.`,
		tags:['android'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/LuaJIT-android',
		title:'LuaJIT-android',
		desc:`LuaJIT on android, uses my lua-java project to write android apps in pure LuaJIT.  .dex classes are generated and side-loaded at runtime. No more need for Android Studio!`,
		tags:['android'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/LuaJIT-android-lib',
		title:'LuaJIT-android-lib',
		desc:`Makefile for cross-compiling luajit library and binary for android`,
		tags:['android'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/SDL-in-LuaJIT-android',
		title:'SDL-in-LuaJIT-android',
		desc:`This is another SDL-with-LuaJIT-in-Android but instead of running SDL first, it runs LuaJIT first, then SDL within it`,
		tags:['android'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Bible-android',
		title:'Bible-android',
		desc:`My first example of my LuaJIT-android framework: a Bible app, using a no-studio no-gradle build.  Repo is 100x smaller, apk is 100x smaller, RAM usage is 100x smaller.
How did the modern state of software become so apathetic?`,
		tags:['android'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-ext',
		title:'lua-ext',
		desc:`useful extensions to Lua base libraries`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/http-lua',
		title:'http-lua',
		desc:`simple http server, complete with correct content-types from iana.org`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-gui',
		title:'lua-gui',
		desc:`luajit driven widget library for opengl/sdl`,
		tags:['lua'],
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-ffi-bindings',
		title:'lua-ffi-bindings',
		desc:`LuaJIT FFI bindings based on system headers / C runtime / POSIX.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/include-lua',
		title:'include-lua',
		desc:`LuaJIT FFI binding generation`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-imgui',
		title:'lua-imgui',
		desc:`imgui lua wrapper`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-sdl',
		title:'lua-sdl',
		desc:`lua version of SDL app framework`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/earth-magnetic-field-lua',
		title:'earth-magnetic-field-lua',
		desc:`visualization of the 2020 WMM data`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/langfix-lua',
		title:'langfix-lua',
		desc:`Pure-Lua fix for some things in the language, especially missing in LuaJIT`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-integrate',
		title:'lua-integrate',
		desc:`integration methods, explicit and implict, implemented in Lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/solarsystem-lua',
		title:'solarsystem-lua',
		desc:`original Lua version of the solarsystem project`,
		tags:['lua'],
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-plot2d',
		title:'lua-plot2d',
		desc:`2d interactive plotting program based on luajit`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/hydro-cl-lua',
		title:'hydro-cl-lua',
		desc:`yet *another* hydrodynamics/hyperbolic conservation law solver, this one in LuaJIT using OpenCL/OpenGL`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/struct-lua',
		title:'struct-lua',
		desc:`helper for generating ffi structs`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/zeta3d-lua',
		title:'zeta3d-lua',
		desc:`(private repo) Voxel metroidvania.  I should publicise it but it's probably in a broken state.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-image',
		title:'lua-image',
		desc:`LuaJIT image save/load library`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/polynomial-complex-roots',
		title:'polynomial-complex-roots',
		desc:`plotting polynomial roots in complex plane`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/chinese-checkers-on-sphere-lua',
		title:'chinese-checkers-on-sphere-lua',
		desc:`Chinese checkers on the surface of various platonic solid based geodesic circles.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/mesh-lua',
		title:'mesh-lua',
		desc:`Lua 3D Mesh library centered around Alias-Wavefront .obj format.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-audio',
		title:'lua-audio',
		desc:`LuaJIT audio`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-cl',
		title:'lua-cl',
		desc:`Lua/OpenCL bindings`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-clip',
		title:'lua-clip',
		desc:`lua wrapper for my fork of libclip`,
		tags:['lua'],
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
		tags:['lua'],
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-jfnk',
		title:'lua-jfnk',
		desc:`Lua implementation of Jacobian-Free Newton-Krylov solver`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/vec-ffi-lua',
		title:'vec-ffi-lua',
		desc:`vector class for LuaJIT based on ffi / primitive types`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/vec-lua',
		title:'vec-lua',
		desc:`vector math library for Lua`,
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-matrix',
		title:'lua-matrix',
		desc:`matrix class for lua. in the spirit of matlab syntax.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/luafilesystem',
		title:'luafilesystem',
		desc:`Reimplement luafilesystem via LuaJIT FFI with unicode facilities`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-gnuplot',
		title:'lua-gnuplot',
		desc:`gnuplot wrapper`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/complex-lua',
		title:'complex-lua',
		desc:`Lua complex number class, for FFI and vanilla`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-app3d',
		title:'lua-app3d',
		desc:`3D-application support classes`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/cl-cpu-lua',
		title:'cl-cpu-lua',
		desc:`My shoddily made CPU device replacement for OpenCL in LuaJIT`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-ffi-c',
		title:'lua-ffi-c',
		desc:`write c code inside your lua code. use gcc and luajit ffi to build and link while you run.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/cayley-dickson',
		title:'cayley-dickson',
		desc:`simple script to generate dot files of cayley-dickson multiplication tables`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/n-points-lua',
		title:'n-points-lua',
		desc:`N-points evenly spaced on a sphere, with or without repulsive-forces.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/super-metroid-randomizer-lua',
		title:'super-metroid-randomizer-lua',
		desc:`super metroid item / enemy / door randomizer`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-plot3d',
		title:'lua-plot3d',
		desc:`3D interactive plotting program. got sick of gnuplot's 3D graph display running at &lt;1 fps.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-lua',
		title:'lua-lua',
		desc:`LuaJIT bindings for LuaJIT.  Allows your LuaJIT state to access itself and/or create sub-states.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-thread',
		title:'lua-thread',
		desc:`pthread library in LuaJIT, using lua-lua LuaJIT-states-in-LuaJIT.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-gl',
		title:'lua-gl',
		desc:`OpenGL wrapper classes and SDLApp subclass for LuaJIT`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-vk',
		title:'lua-vk',
		desc:`Vulkan wrapper classes and SDLApp subclass for LuaJIT`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-wgpu',
		title:'lua-wgpu',
		desc:`WebGPU wrapper classes and SDLApp subclass for LuaJIT`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/git-lua',
		title:'git-lua',
		desc:`useful lua scripts for managing multiple git repositories`,
		tags:['lua'],
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/zeta-lua',
		title:'zeta-lua',
		desc:`A 2D platformer engine in LuaJIT`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/force-directed-graph-lua',
		title:'force-directed-graph-lua',
		desc:`force directed graph utility in Lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/geographic-charts-lua',
		title:'geographic-charts-lua',
		desc:`Putting all my common map projections in one place`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/seashell-lua',
		title:'seashell-lua',
		desc:`seashell parametric function class viewer`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/volume-renderer-lua',
		title:'volume-renderer-lua',
		desc:``,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/tetris-attack-lua',
		title:'tetris-attack-lua',
		desc:``,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/following-fdtd-lessons',
		title:'following-fdtd-lessons',
		desc:`me following some fdtd lessons online`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-neuralnet',
		title:'lua-neuralnet',
		desc:`neural network classes in Lua`,
		tags:['lua'],
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/surface-from-connection-lua',
		title:'surface-from-connection-lua',
		desc:`reconstructing surfaces from a rectangular grid of connection coefficients`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-math',
		title:'lua-math',
		desc:`lua common math functions`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/moldwars',
		title:'moldwars',
		desc:`performance testing some GL + SDL + LuaJIT code`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-metric',
		title:'lua-metric',
		desc:`lua+imgui version of the html+emscripten+lua version of the lua version of my metric / diff geom visualization tool`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/gravitational-waves-lua',
		title:'gravitational-waves-lua',
		desc:`1D physics simulation of various finite-volume schemes and equations, including Euler-fluids, ideal-Maxwell, and 1D ADM gravitational waves.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/SphericalHarmonicGraphs',
		title:'SphericalHarmonicGraphs',
		desc:`rendering of spherical harmonic + associated legendre graphs`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/pong-lua',
		title:'pong-lua',
		desc:`pong in lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lambda-cdm-lua',
		title:'lambda-cdm-lua',
		desc:`lambda-CDM model time integrator with gui`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/efesoln-cl-lua',
		title:'efesoln-cl-lua',
		desc:`LuaJIT/OpenCL port of my Einstein Field Equation solver project`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/prime-spiral-lua',
		title:'prime-spiral-lua',
		desc:`plot that stupid prime spiral pattern`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/nbody-gpu-lua',
		title:'nbody-gpu-lua',
		desc:`n-body simulation on gpu in LuaJIT`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/convert-to-8x8x4bpp',
		title:'convert-to-8x8x4bpp',
		desc:`Messing with algorithms for converting RGB images into SNES format: 8x8 tiles of 4bpp, each tile with a unique upper 4bpp, which index into a 256-bit palette.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/earth-transport-network',
		title:'earth-transport-network',
		desc:`Earth transport network I designed based on the Apollyon gasket problem.  Works as an intermediate between a space-elevator and a dyson-sphere.  Powered by planet rotation.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/seismographic-stations',
		title:'seismographic-stations',
		desc:`thought i would plot the seismo data around the world`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/rule110-lua',
		title:'rule110-lua',
		desc:`Rule 110 in GLSL in Lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/dungeons-n-munchers-lua',
		title:'dungeons-n-munchers-lua',
		desc:``,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/line-integral-convolution-lua',
		title:'line-integral-convolution-lua',
		desc:`line integral convolution in lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-gameapp',
		title:'lua-gameapp',
		desc:`putting some things common to games in one place`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/waves-in-curved-space',
		title:'waves-in-curved-space',
		desc:`visualization of light cones in arbitrary metrics in 2+1 space`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/noaa_flares',
		title:'noaa_flares',
		desc:`counting and graphing the number of flares that NOAA posts online`,
		tags:['lua'],
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/noaa_drap',
		title:'noaa_drap',
		desc:`NOAA DRAP query tool`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/grem-lua',
		title:'grem-lua',
		desc:`(WIP) yet *another* attempt at solving metric using the Einstein field equations specified along a grid`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-netrefl',
		title:'lua-netrefl',
		desc:`synchronizing data across the network`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/texture-atlas',
		title:'texture-atlas',
		desc:`texture atlas generator`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/sphere-grid-lua',
		title:'sphere-grid-lua',
		desc:`sphere grid`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/chompman',
		title:'chompman',
		desc:`Pac-Man in 3D.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/ascii-art-vpl',
		title:'ascii-art-vpl',
		desc:`Ascii-art visual programming language.`,
		tags:['lua'],
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/space-filling-curve',
		title:'space-filling-curve',
		desc:`space filling curves ... which turned into a L-system project`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-selfmodify',
		title:'lua-selfmodify',
		desc:`self-modifying code wrapped in a genetic algorithm. lots more buzzwords too.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/htmlparser-lua',
		title:'htmlparser-lua',
		desc:`HTML parser in Lua.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-csv',
		title:'lua-csv',
		desc:`CSV parser in Lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua_to_batch',
		title:'lua_to_batch',
		desc:`utility for converting from Lua scripts to Windows Batch files`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua_to_js',
		title:'lua_to_js',
		desc:`Lua to JS transpiler`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-parser',
		title:'lua-parser',
		desc:`Lua parser and abstract syntax tree in Lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/c-h-parser-lua',
		title:'c-h-parser-lua',
		desc:`C header parser in Lua.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-java',
		title:'lua-java',
		desc:`LuaJIT access to Java through JNI.  Comes with a Java and Dalvik-Dex assembler and class side-loader.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/mono-lua',
		title:'mono-lua',
		desc:`Run mono C# in LuaJIT`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/python-lua',
		title:'python-lua',
		desc:`Python bindings and wrappers for LuaJIT`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/leftargs-lua',
		title:'leftargs-lua',
		desc:`What if function arguments went on the left side instead of the right side of a function call?  This is now a feature of langfix-lua.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/smooth-graph-lua',
		title:'smooth-graph-lua',
		desc:`plot successively smoothed graphs`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-simplexnoise',
		title:'lua-simplexnoise',
		desc:`LuaJIT simplex noise`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/fibonacci-modulo',
		title:'fibonacci-modulo',
		desc:`fibonacci sequence modulo plotted on circles`,
		tags:['lua'],
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
		tags:['lua'],
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
		tags:['lua'],
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-resourcecache',
		title:'lua-resourcecache',
		desc:`resource cache`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/modules-lua',
		title:'modules-lua',
		desc:`chop up code into pieces, only use the parts that are necessary, useful when your compiler compiles everything and compile times are far too slow`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/ncurses-lua',
		title:'ncurses-lua',
		desc:`ncurses-lua`,
		tags:['lua'],
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
		tags:['lua'],
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/geo-center-earth',
		title:'geo-center-earth',
		desc:`find the center of the earth by surface area`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/VectorFieldDecomposition-lua',
		title:'VectorFieldDecomposition-lua',
		desc:`decomposing and annotating vector fields`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/cfdmeshlua',
		title:'cfdmeshlua',
		desc:`2D Roe scheme on an arbitrary mesh, written in Lua`,
		tags:['lua'],
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/teukolsky-waves',
		title:'teukolsky-waves',
		desc:``,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/regge-lua',
		title:'regge-lua',
		desc:`(WIP) Regge calculus simulation of 1+1 spacetime.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/preproc-lua',
		title:'preproc-lua',
		desc:`C preprocessor in Lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-profile',
		title:'lua-profile',
		desc:`profiler for lua code`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/emoji-lua',
		title:'emoji-lua',
		desc:`Lua but with the keywords, symbols, libraries replaced with emojis.`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/lua-local-default',
		title:'lua-local-default',
		desc:`Make Lua use locals-by-default in functions ... with Lua!`,
		tags:['lua'],
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/gpu_from_pde-lua',
		title:'gpu_from_pde-lua',
		desc:`(WIP) PDE solver on GPU, all in Lua`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/all-tensor-muls',
		title:'all-tensor-muls',
		desc:`count all unique tensor products for specific input and output degrees`,
		tags:['lua'],
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
		tags:['lua'],
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
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/thirteen-lua',
		title:'thirteen-lua',
		desc:`solver for the solitaire game 'thirteen'`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/poker-lua',
		title:'poker-lua',
		desc:`poker in Lua, comes with a stupid AI that you can beat pretty easy`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/cards-lua',
		title:'cards-lua',
		desc:`simple library for card games`,
		tags:['lua'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/CFDMesh',
		title:'CFDMesh',
		desc:`same as my Lua mesh-based CFD simulation, except now moving it to C++ so it'll run a bit faster`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/HydrodynamicsGPU',
		title:'HydrodynamicsGPU',
		desc:`Schemes of Roe, HLL, HLLC, Burgers; Equations of 1D, 2D, 3D; Euler, SRHD, Maxwell, Bona-Masso ADM; Implemented in OpenCL`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Hydrodynamics',
		title:'Hydrodynamics',
		desc:`C++ CFD sim based on Tensor template framework`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/NBodyGPU',
		title:'NBodyGPU',
		desc:`yet another N-Body simulation in OpenCL`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/CellularGPU',
		title:'CellularGPU',
		desc:`OpenCL driven Conway's Game of Life`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/AsteroidsSPH',
		title:'AsteroidsSPH',
		desc:`asteroids with SPH and maybe other tricks`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/EinsteinFieldEquationSolution',
		title:'EinsteinFieldEquationSolution',
		desc:`inverse solves G_ab = 8 pi T_ab for the metric tensor g_ab based on primitives used to compute T_ab`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/VolumeTest',
		title:'VolumeTest',
		desc:`numerically verifying formula for volume of any simplex in any dimension`,
		tags:['c++'],
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
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Topple',
		title:'Topple',
		desc:`create images of Abelian sandpile models`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Solver',
		title:'Solver',
		desc:`collection of linear and nonlinear solver classes`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/tripletriadminmax',
		title:'tripletriadminmax',
		desc:`(private repo) Min-max algorithm applied to Final Fantasy 8's Triple-Triad.  It still needs some kind of heuristic, it's not working as well as it should.  Private until I get it in a less shameful state.`,
		tags:['c++'],
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
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/CLCPU',
		title:'CLCPU',
		desc:`Lua shim layer of OpenCL API to grep .cl code into .c code and invoke gcc/clang.`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/CxxAsLua',
		title:'CxxAsLua',
		desc:`made analogous C++ classes to Lua functionality. could be used for a translator.`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Tensor',
		title:'Tensor',
		desc:`C++ template metaprogram driven differential-geometry math-tensor library.  Complete with implicit multiplication and index-notation operations. Not stupid AI "tensor", which aren't tensors at all, but are just high-dimension tuples of numbers.`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/WebGPUApp',
		title:'WebGPUApp',
		desc:`WebGPU C API demo.`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/VulkanApp',
		title:'VulkanApp',
		desc:`Working out a foundation class based on SDLApp for Vulkan projects.`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Relativity',
		title:'Relativity',
		desc:`General relativity 3+1 formalism simulation.  My first attempt, using finite-difference, long before I made a proper framework and libraries surrounding my physics simulations.`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/worldgen',
		title:'worldgen',
		desc:`procedural world generation`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Profiler',
		title:'Profiler',
		desc:`C++ profiling code`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/ImGuiCommon',
		title:'ImGuiCommon',
		desc:`Class-wrapper for SDLApp's to use ImGui.`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/GLApp',
		title:'GLApp',
		desc:`OOP-izing SDL 3 for GL apps.`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/ImageProcessing',
		title:'ImageProcessing',
		desc:`gradient domain image processing`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Image',
		title:'Image',
		desc:`image loading library in C++. I'm slowly collecting formats.`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/NeuralNet',
		title:'NeuralNet',
		desc:`simple c++ backprop network class`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/LuaCxx',
		title:'LuaCxx',
		desc:`OOP wrapper for Lua`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/SDLApp',
		title:'SDLApp',
		desc:`Foundation class for SDL applications`,
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/GLCxx',
		title:'GLCxx',
		desc:`C++ GL wrapper classes`,
		tags:['c++'],
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
		tags:['c++'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/js-util',
		title:'js-util',
		desc:`WebGL oop-ized`,
		//tags:['unsorted'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/gl-js',
		title:'gl-js',
		desc:`putting my js WebGL wrapper classes in one place`,
		//tags:['unsorted'],
	}),
	/* private
	new ProjectThumb({
		href:'https://github.com/thenumbernine/kart-js',
		title:'kart-js',
		desc:`start on my js port of kart`,
		//tags:['unsorted'],
	}),
	*/
	/* private
	new ProjectThumb({
		href:'https://github.com/thenumbernine/kart-lua',
		title:'kart-lua',
		desc:`go go kart madness`,
		//tags:['unsorted'],
	}),
	*/
	/* private
	new ProjectThumb({
		href:'https://github.com/thenumbernine/socialbrowsing',
		title:'socialbrowsing',
		desc:`Interact with people viewing the same webpage.`,
		//tags:['unsorted'],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/MatMulKernelTest',
		title:'MatMulKernelTest',
		desc:`performance test of varying fixed-size matrix multiply kernel executed at each cell in a 256x256 grid`,
		//tags:['unsorted'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/DFCrack',
		title:'DFCrack',
		desc:`DFHack port attempt using LuaJIT's cdef in place of the typical intermediate C layer of structs and bindings.`,
		//tags:['unsorted'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/bank-game-js',
		title:'bank-game-js',
		desc:`Bank: A bomb block pushing puzzle game`,
		//tags:['unsorted'],
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
		//tags:['unsorted'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/wii-sdl-luajit',
		title:'wii-sdl-luajit',
		desc:`Wii devkitPro + LuaJIT + SDL, scripts I found online somewhere.`,
		//tags:['unsorted'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/wii-luajit',
		title:'wii-luajit',
		desc:`LuaJIT for Wii / devkitPro, scripts I found online somewhere.`,
		//tags:['unsorted'],
	}),
	/*
	new ProjectThumb({
		href:'https://github.com/thenumbernine/mmo-js',
		title:'mmo-js',
		desc:`making a mmo or something`,
		//tags:['unsorted'],
	}),
	*/
	/* private
	new ProjectThumb({
		href:'https://github.com/thenumbernine/magnetometer-js',
		title:'magnetometer-js',
		desc:`magnetometer reading in javascript`,
		//tags:['unsorted'],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/FFTactics_BlenderPlugin',
		title:'FFTactics_BlenderPlugin',
		desc:`Blender plugin for importing Final Fantasy Tactics .GNS files`,
		//tags:['unsorted'],
	}),
	new ProjectThumb({
		href:'https://github.com/thenumbernine/multiplicative-persistence',
		title:'multiplicative-persistence',
		desc:`multiplicative persistence search`,
		//tags:['unsorted'],
	}),
	/* deprecated in favor of the math notebooks
	new ProjectThumb({
		href:'https://github.com/thenumbernine/loop-quantum-gravity',
		title:'loop-quantum-gravity',
		desc:`I'm teaching myself loop quantum gravity and putting the proofs/sources here`,
		//tags:['unsorted'],
	}),
	*/
	new ProjectThumb({
		href:'https://github.com/thenumbernine/Sod_exact',
		title:'Sod_exact',
		desc:`exact solution for Sod shock tube test`,
		//tags:['unsorted'],
	}),
	new ProjectHTML({innerHTML:
`<h1>More old repos</h1>
<a href='https://web.archive.org/web/20240811120040/https://christopheremoore.net/'>christopheremoore.net in archive.org</a><br>
<br>
I've got even more old repos on my old website, which now only exists in archive.org, since I am too poor to pay for fees.  Despite programming nearly every day of my life since I was a child, despite having a BSc in Comp Sci and Math and MSc in Comp Sci, despite being a decade ahead of the "deep learning" craze, despite writing my own CAS and numerical relativity GPU simulations that would run on a laptop while the "experts" simulators needed a supercomputer ... I have not had a software job since 2018.<br>
My enemies are gloating over me.  My friends remain silent.  Maybe they were never friends to begin with.<br><br>
`
	}),
];

const cardGrid = document.querySelector('.card-grid');
projects.forEach(p => cardGrid.appendChild(p.dom()));
