#!/usr/bin/env lua
require 'ext'
local url = require 'socket.url'

local s = table{[[
]]}

table.wrapfor(path:rdir(function(f, isdir)
	local dir, name = path(f):getdir()
	return name.path ~= '.git' and (isdir or name.path:sub(-5) == '.html')
end))
:mapi(function(f)
	f = f[1].path
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

path'math.html':write([[
<!doctype html>
<html>
	<head>
	<title>math</title>
	</head>
	<body>
]]..s:concat'\n'..[[
	</body>
</html>
]])
