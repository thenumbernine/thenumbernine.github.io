#!/usr/bin/env lua
require 'ext'
local url = require 'socket.url'

local base = [[https://thenumbernine.github.io/]]

local s = table{[[
Output CDN URLs:
]]}

os.rlistdir('.', function(f, isdir)
	return f ~= '.git' and (isdir or f:sub(-5) == '.html')
end):mapi(function(f)
	assert(f:sub(1,2) == './')
	return f:sub(3)
end):sort():mapi(function(f)
	local name = f:sub(1,-6)
	s:insert('['..name..']('..base..
		url.escape(f)
			:gsub('%%2f','/')
			:gsub('%%2e','.')
		..')\n')
end)

file'README.md':write( [[
I'm just using this for CDN URLs for the time being.

]]..s:concat'\n')
