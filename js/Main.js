var FPS = 30;
var SECONDS_BETWEEN_FRAMES = 1 / FPS;
var g_GameObjectManager = null;
var g_ApplicationManager = null;
var g_ResourceManager = null;
var g_score = 0;
var g_player = null;

window.onload = function ()
{
    new GameObjectManager();
};
