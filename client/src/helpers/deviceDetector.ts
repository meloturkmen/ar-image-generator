function isIOS(): boolean {
    return (
        ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
            navigator.platform
        ) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    );
}

function isAndroid(): boolean {
    return /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function getDeviceType(): string {
    return isIOS() ? 'IOS' : isAndroid() ? 'ANDROID' : 'DESKTOP';
}

export { getDeviceType, isIOS, isAndroid };
