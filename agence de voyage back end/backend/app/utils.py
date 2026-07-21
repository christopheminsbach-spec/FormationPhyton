from urllib.parse import urlparse



def extract_image_path(url):

    return urlparse(
        url
    ).path



def build_image_url(path):

    return (
        "https://images.unsplash.com"
        + path
    )