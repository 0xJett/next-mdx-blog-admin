# next-mdx-blog-admin
A CMS to manage MDX articles, configure your email address in the environment variables using the Supabase management permissions integrated with Vercel and logging in with OTP.

## Create DB SQL
CREATE TABLE category (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tag (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  slug VARCHAR(30) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE article (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  keywords TEXT[],
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  category_id BIGINT NOT NULL REFERENCES category(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE article_tag (
  article_id BIGINT NOT NULL REFERENCES article(id) ON DELETE CASCADE,
  tag_id BIGINT NOT NULL REFERENCES tag(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

CREATE TRIGGER update_category_modtime
BEFORE UPDATE ON category
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_tag_modtime
BEFORE UPDATE ON tag
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_article_modtime
BEFORE UPDATE ON article
FOR EACH ROW EXECUTE FUNCTION update_modified_column();