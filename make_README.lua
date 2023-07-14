#!/usr/bin/env lua
require 'ext'
local url = require 'socket.url'

local base = [[https://thenumbernine.github.io/]]

local s = table{[[
Output CDN URLs:
]]}

file'.':rdir(function(f, isdir)
	local dir, name = file(f):getdir()
	return name ~= '.git' and (isdir or name:sub(-5) == '.html')
end):mapi(function(f)
	if f:sub(1,2) == './' then f = f:sub(3) end
	return f
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
