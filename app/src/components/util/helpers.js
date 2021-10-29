import CryptoJS from "crypto-js";

// format data with aes encyrption
export const aesEnc = (val) => {
	return CryptoJS.AES.encrypt(
		JSON.stringify(val),
		process.env.REACT_APP_HASHKEY
	);
};

export const aesDec = (val) => {
	let bytes = CryptoJS.AES.decrypt(val, process.env.REACT_APP_HASHKEY);
	// return bytes.toString()
	return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const setCookie = (cookieName, value) => {
	let newDate = new Date();
	newDate.setHours(newDate.getHours() + 1);
	const expires = "expires=" + newDate.toGMTString();

	document.cookie = `${cookieName}=${aesEnc(value)};${expires}`;
	// return
};

export const getCookie = (cookieName) => {
	if (document.cookie) {
		const cookieArray = document.cookie.split(";");
		// console.log(`Cookie array: ${cookieArray}`);
		for (let index = 0; index < cookieArray.length; index++) {
			const newString = cookieArray[index].substring(
				0,
				cookieName.length
			);
			// console.log(newString);
			if (newString === cookieName) {
				const cookieString = document.cookie.substr(
					document.cookie.indexOf("=") + 1
				);
				// console.log(cookieString);
				const decryptedCookie = aesDec(cookieString);
				return decryptedCookie;
				// return cookieString
			} else {
				// console.log("Cookie is not filled");
				return false;
			}
		}
	} else {
		// console.log('No cookies are present');
		return false;
	}
};

export const clearCookie = (cookieName) => {
	document.cookie = `${cookieName}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
};