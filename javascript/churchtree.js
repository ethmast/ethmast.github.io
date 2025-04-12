// Get the container element
const treeContainer = document.querySelector('.tree');
const treeList = treeContainer.querySelector('ul');

// Set initial transform values
let scale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX, startY;
let lastDistance = 0;

// Apply initial styling to make the container a viewport
treeContainer.style.overflow = 'hidden';
treeContainer.style.position = 'relative';
treeList.style.transformOrigin = '0 0';
treeList.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
treeList.style.transition = 'transform 0.1s ease-out';

// === MOUSE EVENTS ===

// Handle mouse wheel for zooming
treeContainer.addEventListener('wheel', function(e) {
    e.preventDefault();
    
    // Get mouse position relative to the container
    const rect = treeContainer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Determine zoom direction and factor
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    
    // Limit zoom scale to reasonable bounds
    const newScale = Math.min(Math.max(scale * zoomFactor, 0.5), 5);
    
    if (newScale !== scale) {
        // Calculate new position to zoom toward mouse cursor
        const scaleDiff = newScale - scale;
        translateX -= (mouseX / scale) * scaleDiff;
        translateY -= (mouseY / scale) * scaleDiff;
        
        // Update scale
        scale = newScale;
        
        // Apply the new transform
        updateTransform();
    }
});

// Handle mouse down for panning
treeContainer.addEventListener('mousedown', function(e) {
    if (e.button === 0) { // Left mouse button
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        treeList.style.transition = 'none'; // Disable transition during dragging
        treeContainer.style.cursor = 'grabbing';
        e.preventDefault();
    }
});

// Handle mouse move for panning
window.addEventListener('mousemove', function(e) {
    if (isDragging) {
        const dx = (e.clientX - startX) / scale;
        const dy = (e.clientY - startY) / scale;
        
        translateX += dx;
        translateY += dy;
        
        startX = e.clientX;
        startY = e.clientY;
        
        updateTransform();
        e.preventDefault();
    }
});

// Handle mouse up to stop panning
window.addEventListener('mouseup', function() {
    if (isDragging) {
        isDragging = false;
        treeList.style.transition = 'transform 0.1s ease-out'; // Re-enable transition
        treeContainer.style.cursor = 'default';
    }
});

// === TOUCH EVENTS ===

// Handle touch start for panning and pinch-to-zoom
treeContainer.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
        // Single touch - prepare for panning
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        treeList.style.transition = 'none';
    } else if (e.touches.length === 2) {
        // Two touches - prepare for pinch zoom
        isDragging = false;
        lastDistance = getDistance(
            e.touches[0].clientX, e.touches[0].clientY,
            e.touches[1].clientX, e.touches[1].clientY
        );
    }
    e.preventDefault();
});

// Handle touch move for panning and pinch-to-zoom
treeContainer.addEventListener('touchmove', function(e) {
    if (e.touches.length === 1 && isDragging) {
        // Single touch - handle panning
        const dx = (e.touches[0].clientX - startX) / scale;
        const dy = (e.touches[0].clientY - startY) / scale;
        
        translateX += dx;
        translateY += dy;
        
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        
        updateTransform();
    } else if (e.touches.length === 2) {
        // Two touches - handle pinch zoom
        const currentDistance = getDistance(
            e.touches[0].clientX, e.touches[0].clientY,
            e.touches[1].clientX, e.touches[1].clientY
        );
        
        if (lastDistance > 0) {
            // Calculate new scale based on the change in distance
            const pinchRatio = currentDistance / lastDistance;
            const newScale = Math.min(Math.max(scale * pinchRatio, 0.5), 5);
            
            if (newScale !== scale) {
                // Calculate the midpoint between the two touches
                const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
                
                // Get midpoint relative to container
                const rect = treeContainer.getBoundingClientRect();
                const touchMidX = midX - rect.left;
                const touchMidY = midY - rect.top;
                
                // Calculate new position to zoom toward the midpoint
                const scaleDiff = newScale - scale;
                translateX -= (touchMidX / scale) * scaleDiff;
                translateY -= (touchMidY / scale) * scaleDiff;
                
                // Update scale
                scale = newScale;
                
                updateTransform();
            }
        }
        
        lastDistance = currentDistance;
    }
    e.preventDefault();
});

// Handle touch end
treeContainer.addEventListener('touchend', function(e) {
    if (e.touches.length === 0) {
        isDragging = false;
        treeList.style.transition = 'transform 0.1s ease-out';
    } else if (e.touches.length === 1) {
        // If we go from 2 touches to 1, prepare for panning
        lastDistance = 0;
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }
    e.preventDefault();
});

// Handle touch cancel
treeContainer.addEventListener('touchcancel', function(e) {
    isDragging = false;
    lastDistance = 0;
    treeList.style.transition = 'transform 0.1s ease-out';
});

// === HELPER FUNCTIONS ===

// Calculate the distance between two points (for pinch zoom)
function getDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Helper function to update the transform
function updateTransform() {
    treeList.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
}

// Prevent context menu when dragging
treeContainer.addEventListener('contextmenu', function(e) {
    if (isDragging) {
        e.preventDefault();
    }
});

// Add reset functionality with double-click/double-tap
treeContainer.addEventListener('dblclick', function(e) {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
    e.preventDefault();
});

// For mobile double-tap reset (requires a tap timer)
let lastTap = 0;
let tapTimer;

treeContainer.addEventListener('touchend', function(e) {
    if (e.touches.length === 0 && e.changedTouches.length === 1) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        clearTimeout(tapTimer);
        
        if (tapLength < 300 && tapLength > 0) {
            // Double tap detected
            scale = 1;
            translateX = 0;
            translateY = 0;
            updateTransform();
            e.preventDefault();
        } else {
            // Potential first tap of a double tap
            tapTimer = setTimeout(function() {
                // Single tap action if needed
            }, 300);
        }
        
        lastTap = currentTime;
    }
});