module.exports = {
  default: process.env.FLYDRIVE_DEFAULT,

  disks: {
    local: {
      driver: 'local',
      config: {
        root: process.cwd(),
      },
    },

    s3: {
      driver: 's3',
      config: {
        key: process.env.AWS_S3_KEY,
        secret: process.env.AWS_S3_SECRET,
        region: process.env.AWS_S3_REGION,
        bucket: process.env.AWS_S3_BUCKET,
      },
    },

    spaces: {
      driver: 's3',
      config: {
        key: process.env.SPACES_KEY,
        secret: process.env.SPACES_SECRET,
        endpoint: process.env.SPACES_ENDPOINT,
        bucket: process.env.SPACES_BUCKET,
        region: process.env.SPACES_REGION,
      },
    },
  },
}
