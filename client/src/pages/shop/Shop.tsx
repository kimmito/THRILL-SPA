import ScrollVelocity from '@/components/ui/ScrollVelocity'

import CatalogSection from './catalogSection/CatalogSection'
import PostsSection from './postsSection/PostsSection'

const Shop = () => {
	return (
		<div className="my-30">
			<PostsSection />
			<CatalogSection />
			<ScrollVelocity texts={['THRILL', 'THRILL', 'THRILL']} />

		</div>
	)
}

export default Shop
