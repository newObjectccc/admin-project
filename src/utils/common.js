/**
 * 时间戳转换
 * */
function formatTime(e) {
	let date = new Date(e * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	let D = date.getDate() + ' ';
	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	let s = date.getSeconds();
	if (s.toString().length === 1) {
		s = '0'+s
	}
	return Y+M+D+h+m+s;
}

module.exports = {
    formatTime
}
