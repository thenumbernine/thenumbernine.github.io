#!/usr/bin/env lua
require 'ext'
local url = require 'socket.url'

local s = table{[[
]]}

file'.':rdir(function(f, isdir)
	local dir, name = file(f):getdir()
	return name ~= '.git' and (isdir or name:sub(-5) == '.html')
end):mapi(function(f)
	if f:sub(1,2) == './' then f = f:sub(3) end
	return f
end):sort():mapi(function(f)
	local name = f:sub(1,-6)
	s:insert('<a href="'
		..url.escape(f)
			:gsub('%%2f','/')
			:gsub('%%2e','.')
		..'">'
		..name
		..'</a><br>')
end)

file'index.html':write([[
<!doctype html>
<html>
	<head>
	<title>index</title>
	</head>
	<body>
]]..s:concat'\n'..[[
	</body>
</html>
]])
