function getCookies() {
  let cookies = document.cookie.split(";").reduce((cookies, cookie) => {
    const [name, val] = cookie.split("=").map((c) => c.trim());
    cookies[name] = val;
    return cookies;
  }, {});
  return cookies;
}

export default getCookies;
