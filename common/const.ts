import { Module } from './types/module';

export const SIDE_BAR_WIDTH_PX = 56;

export const GOOGLE_FAVICON_URL = 'https://www.google.com/s2/favicons';

export const TEST_MODULE_GROUP: Module[] = [
  {
    id: '1',
    url: 'https://google.com',
    favicon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAkFBMVEVHcEzg4eL////6+/v////////4+fn9/v7x8vL9/f38/Pz+/v7///////////8dpUb+/PzqOy0xfvPR3/2938T8vQWEq/f79PAvqE7wfHXpMx/l7P08g/WRs/ntYVcjfep1v43ykYv51tR0ofa4zfrv+fdPqUf629fh8OXs04ONyJqNyZpjuHj5zK34qAD8yjs3yEdfAAAADnRSTlMADRWS0qBtLAR85TtHou17CO8AAAChSURBVBiVbY/HAoMgEESxizEjEHvX9P7/f5cF9ZZ32WW2DYxpAu55PGAbtguDay/vgHIxz4KCaQopmWop64mkkIQ90EtZVXVFFY8E4C37AijMHrPh+7kCB6LRW2Igy6g0KKWOQMx2WqD2vMvbHNjpI/fLqMc7dTJnXJyT8pWm49CSt8XXrUyIslmdcWpPH8+UAl+8+1jxt99ZTiRE5FjsHz8fNQziOWMtZgAAAABJRU5ErkJggg==',
  },
  {
    id: '2',
    url: 'https://facebook.com',
    favicon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAgVBMVEVHcEwIcOgKge0TnPsSmvcVpPsFb+YWqf0NifAOivEFb+UYrv8AXuEfs/8Zrv8csv4Yrf6ww/IAUN7///8Gf+0DeOsSm/cCbOUEc+gAmvkPkPMHhfATovqjwfQNi/EQlfWqzPgAjvNxsfUAXuJNqfWWx/jL4fsAZeUfh+wAY+bn9v7ZuOi7AAAAE3RSTlMAGNQY0Zqa/fSJzomJGNQY1OfTcWq8GgAAAK9JREFUGJU1z9kSwiAMBdBU6YJWHU3CIl2grev/f6Dp4nnhcmEYAiBOx3NZno8X2OTlJl/3qpl50ajlvDGN8dMX8eGN3NmbmUcRvTF70L1IA+IzDqnvNai7SBExpCRJQdV1XeAWkSlIrKAKgSIuHhRCBTsi3oqJiHagpRjaJ2Ib30ykIWNmZ+WNj3PsOAMonFuKl6yumL96sPYlxWitPazDFHZci+I/blZfEW91NucfTtoR2alliYYAAAAASUVORK5CYII=',
  },
  {
    id: '3',
    url: 'https://notion.so',
    favicon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACPUlEQVQ4jZWTv0tbURSAv5ubHzjcF3zJVBy6CA5uFodCcas4Oah06ZJFMRhqsWD/BLd2cO6WQkHeJKR2aKC4JOAmDyfFvEEIMea+mIJ5ue92aBMaLUI/OJzD4ZzvcIcrpJSOEOKlECIPuEAecK21ozqdTrtKKff29rYVRdG7fr//GYgBhJTyYzabfVMqlcjlcuRyOVzXHctKKaSUNJtN1tfXqVQqX4wxRWNMO2mMcdrtNo1Gg93dXSYmJgCI45hut4vWmiAI0FqjtWZtbY3Ly8tXp6enz1Op1GsBfAIKwOhap9Oh2+0SxzHpdBqlFNlsdiyCIODk5KTKH4EF7OLioq3Vavbs7MxeXV3ZXq9njTH2X3ieZ4HvCf5iZmaG+fl5lFL4vk+lUqHVagFQq9XY2dmhWCxyc3Mz2hkTDDk6OmJpaYnV1VU2Nzex1jI9PU29Xmdubo7JycnHBYVCgUwmQyKRwPM8Dg4OcF0XpRSJxPjKPwVDSqUSAFtbW6On3OdRwcrKCsvLyzSbTba3t/9fALC/v4/jOJTLZer1+kOBEGLwmGBqaoq9vT0Arq+vHwqSyaR3v3lxccFgMKBcLqO1ZmNjg4WFBQCklGOzySiKvmYymQ93d3dvh80gCPA8j3w+j+M4CCE4PDzk/Pyc2dlZAKIo+i0A6Pf771Op1DPf918cHx/T6/UIw5BGo0G1WkVrTRiGo/8QhiG+7yOl/CmGV6WUT6SUP4wxT4UQIdABhnlUCyE61tpQCNGJ4/jbL13AF6Tkh+a3AAAAAElFTkSuQmCC',
  },
  {
    id: '4',
    url: 'https://reddit.com',
    favicon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEVHcEz/RQD/RQD/QgD/RQD/RQD/RQD/RQD/RQD/RQD/////MgD/OgD/s5//z8P/a0T/5d3/VyH/iGr/qJP/mYD/+vcCA1U1AAAACnRSTlMAJP//y5WUn+ElsgVe0gAAAJFJREFUGJVtT1sOwyAMy0JpIa/C2t3/qjNQaT+zkMAmD5sIqLkwl1zpwcEPjsW3ScxMefv9m7u3WVNXdXJ9Q+BKGYRN+62miXmnMvg7WotT8SzE6ZQHHzkTL+HuIv2SKRTWkHCRC5eiJWOCSJvnNgzFWrtQ4iGuY+0wZt0jHFuWeVhPpmpwsf0PR/TaR/x9xv8CYoYGnu4Mr1kAAAAASUVORK5CYII=',
  },
  {
    id: '5',
    url: 'https://github.com',
    favicon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEX///8AAACHiYwjKC0kKS4vMzgSGSAgJSucnZ/m5udJTFDq6utOUlYEEBgeJCkAAA+Bg4b29vYABxJUWFvHyMlARUk8QEVeYWSTlZcAAAbQ0dIoLjOys7V4en3b29xtcHNm1bXqAAAAnElEQVQYlUVP2xaDIAxrBVrkIohOnW7s//9y4GTmIT3JaZsWoKDXRimjLVzokFgIJux+2iU/SGbJPriqY5rmByqFy7yG0tMjxTa7EVrQdBsdkQbDz7EZI7IDJTz8oVjBIfA2gjjAcdqb3lMZ2cgf15JxYdpK7OuNawbInzDIElsOt3GqPSikP483JudaUXrXnjuDsD0HYHVl3Vf+AjCMBfBjVeXdAAAAAElFTkSuQmCC',
  },
];
