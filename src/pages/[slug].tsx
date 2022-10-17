import { GetPageBySlugQuery, GetPagesQuery } from 'gql/graphql'
import client from 'graphql/client'
import { GET_PAGES, GET_PAGE_BY_SLUG } from 'graphql/queries'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import PageTemplate, { PageTemplateProps } from 'templates/Pages'

export default function Page({ heading, body }: PageTemplateProps) {
  const router = useRouter()
  //retorna um loading, qq coisa enquando ta sendo criado
  if (router.isFallback) return null

  return <PageTemplate heading={heading} body={body} />
}

export async function getStaticPaths() {
  const { abouts } = await client.request<GetPagesQuery>(GET_PAGES, {
    first: 3
  })

  const paths = abouts.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { about } = await client.request<GetPageBySlugQuery>(GET_PAGE_BY_SLUG, {
    slug: `${params?.slug}`
  })

  if (!about) return { notFound: true }
  return {
    props: {
      heading: about.heading,
      body: about.body.html
    }
  }
}

// getStaticPaths => serve para gerar as urls em build time /about /trip/petropolis
//getStaticPropsv => serve para buscar dados da pagina (props) - build time - estático
//getServerSideProps => serve para buscar dados da pagina (props) - runtme - toda requisição (bundle fica no server)
//getInitialProps => serve para buscar dados da pagina (props) - runtme - toda requisição -
//(bundle também vem pro client) - hydrate
