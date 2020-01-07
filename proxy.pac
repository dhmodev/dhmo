function FindProxyForURL(url, host) {
    if (dnsDomainIs(host, "mitm.it")) {
        return "PROXY 192.144.136.64:8761";
    }
    if (dnsDomainIs(host, "site.cc.cmbimg.com")) {
        return "PROXY 192.144.136.64:8761";
    }
    return "DIRECT"
}
