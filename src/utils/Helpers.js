export function generatePassword() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const truncateString = (str, num) => {
  if (str?.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

export const calculateDiscount = (giveawayPrice, realPrice) => {
  const discount = realPrice - giveawayPrice;
  const discountPercentage = Math.round((discount / realPrice) * 100);
  return discountPercentage;
};

export function convertStringsToNumbers(arr) {
  if (arr.length === 0) {
    return "";
  }

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const parsedNumber = parseFloat(arr[i]);

    if (!isNaN(parsedNumber)) {
      result.push(parsedNumber);
    }
  }

  return result;
}

export function sortClothSizes(sizes) {
  const letterSizeOrder = {
    S: 1,
    M: 2,
    L: 3,
    XL: 4,
    XXL: 5,
    XXXL: 6,
  };

  const numberSizeOrder = {
    35: 1,
    36: 2,
    37: 3,
    38: 4,
    39: 5,
    40: 6,
    41: 7,
    42: 8,
    43: 9,
    44: 10,
    45: 11,
    46: 12,
    47: 13,
    48: 14,
  };

  sizes.sort((a, b) => {
    const sizeA = a.size;
    const sizeB = b.size;

    const parsedSizeA = parseInt(sizeA);
    const parsedSizeB = parseInt(sizeB);

    if (!isNaN(parsedSizeA) && !isNaN(parsedSizeB)) {
      // Both sizes are string numbers
      return numberSizeOrder[parsedSizeA] - numberSizeOrder[parsedSizeB];
    } else if (!isNaN(parsedSizeA) && isNaN(parsedSizeB)) {
      // Size A is a string number, Size B is a letter size
      return -1;
    } else if (isNaN(parsedSizeA) && !isNaN(parsedSizeB)) {
      // Size A is a letter size, Size B is a string number
      return 1;
    } else {
      // Both sizes are letter sizes
      return letterSizeOrder[sizeA] - letterSizeOrder[sizeB];
    }
  });

  return sizes;
}

export function convertToEmbedURL(youtubeURL) {
  // Check if the input URL is already in the embedded format
  if (youtubeURL.includes("youtube.com/embed/")) {
    return youtubeURL;
  }

  // Use regular expression to extract the video ID
  const videoIDMatch = youtubeURL.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))([^?&"]+)/);

  if (videoIDMatch && videoIDMatch[1]) {
    const videoID = videoIDMatch[1];
    return `https://www.youtube.com/embed/${videoID}`;
  } else {
    return null; // Invalid YouTube URL
  }
}

export function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const timeDifference = now - date;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (timeDifference < minute) {
    const secondsAgo = Math.floor(timeDifference / 1000);
    return `${secondsAgo} seconds ago`;
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    return `${minutesAgo} minutes ago`;
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    return `${hoursAgo} hours ago`;
  } else {
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
    return `on ${formattedDate}`;
  }
}