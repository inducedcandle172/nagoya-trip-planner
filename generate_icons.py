from PIL import Image, ImageDraw
import os

sizes = [72, 96, 128, 144, 152, 192, 384, 512]

def create_fuji_icon(size):
    # Create a new image with a blue background
    img = Image.new('RGB', (size, size), '#3498db')
    draw = ImageDraw.Draw(img)
    
    # Calculate proportions
    mountain_base = size * 0.8
    mountain_height = size * 0.7
    snow_height = size * 0.3
    
    # Draw Mount Fuji
    mountain_points = [
        (size/2 - mountain_base/2, size * 0.9),  # Left base
        (size/2, size * 0.2),                    # Peak
        (size/2 + mountain_base/2, size * 0.9)   # Right base
    ]
    draw.polygon(mountain_points, fill='white')
    
    # Draw snow cap
    snow_points = [
        (size/2 - mountain_base/4, size * 0.6),
        (size/2, size * 0.2),
        (size/2 + mountain_base/4, size * 0.6),
        (size/2 + mountain_base/6, size * 0.9),
        (size/2 - mountain_base/6, size * 0.9)
    ]
    draw.polygon(snow_points, fill='#ECF0F1')
    
    return img

def generate_icons():
    if not os.path.exists('icons'):
        os.makedirs('icons')
    
    for size in sizes:
        icon = create_fuji_icon(size)
        output_file = f'icons/icon-{size}x{size}.png'
        icon.save(output_file, 'PNG')
        print(f'Generated {size}x{size} icon')

if __name__ == '__main__':
    generate_icons() 