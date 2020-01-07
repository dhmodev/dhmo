function FindProxyForURL(url, host) {
    if (dnsDomainIs(host, "mitm.it")) {
        return "PROXY 140.143.250.72:8761";
    }
    if (dnsDomainIs(host, "site.cc.cmbimg.com")) {
        return "PROXY 140.143.250.72:8761";
    }
    return "DIRECT"
}